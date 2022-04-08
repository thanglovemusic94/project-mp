package com.mintpot.carcloth.service.impl;

import com.mintpot.carcloth.constant.enums.EProductType;
import com.mintpot.carcloth.dto.car.*;
import com.mintpot.carcloth.entity.Member;
import com.mintpot.carcloth.entity.car.Brand;
import com.mintpot.carcloth.entity.car.CarType;
import com.mintpot.carcloth.entity.car.Category;
import com.mintpot.carcloth.entity.car.Model;
import com.mintpot.carcloth.entity.embeddable.FileInfo;
import com.mintpot.carcloth.exception.CommonException;
import com.mintpot.carcloth.exception.ErrorCode;
import com.mintpot.carcloth.repository.*;
import com.mintpot.carcloth.security.AuthenticationFacade;
import com.mintpot.carcloth.security.UserDetails;
import com.mintpot.carcloth.service.CarService;
import com.mintpot.carcloth.utils.StorageService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CarServiceImpl implements CarService {

    private static final String STORAGE_PATH_CATEGORY = "category/";
    private static final String STORAGE_PATH_BRAND = "brand/";
    private static final String STORAGE_PATH_CAR_TYPE = "car-type/";
    public static final int COLUMN_INDEX_NO = 0;
    public static final int COLUMN_INDEX_PRODUCT_TYPE = 1;
    public static final int COLUMN_INDEX_BRAND = 2;
    public static final int COLUMN_INDEX_MODEL = 3;
    public static final int COLUMN_INDEX_CAR_TYPE = 4;

    private final MemberRepository memberRepo;
    private final CarTypeRepository carTypeRepo;
    private final BrandRepository brandRepo;
    private final CategoryRepository categoryRepo;
    private final ModelRepository modelRepo;
    private final ModelMapper mapper;
    private final StorageService storageService;
    private final AuthenticationFacade authenticationFacade;

    @Override
    public List<CategoryDetail> getAllCategory() {

        return categoryRepo.getAll().stream()
                .map(c -> mapper.map(c, CategoryDetail.class))
                .collect(Collectors.toList());
    }

    @Override
    public void changeCategoryOrder(List<CategoryOrder> orders) {
        if (orders == null || orders.isEmpty()) return;

        var categories = orders.stream()
                .map(c -> {
                    var category = categoryRepo.findById(c.getId())
                            .orElseThrow(() -> new CommonException(ErrorCode.CATEGORY_NOT_FOUND));

                    category.setOrderCategory(-category.getOrderCategory());
                    categoryRepo.save(category);

                    category.setOrderCategory(c.getOrderCategory());
                    return category;
                })
                .collect(Collectors.toList());

        try {
            categoryRepo.saveAll(categories);
        } catch (Exception e) {
            //Roll back when exception
            for (var o : orders) {
                var category = categoryRepo.findById(o.getId())
                        .orElseThrow(() -> new CommonException(ErrorCode.CATEGORY_NOT_FOUND));

                category.setOrderCategory(-category.getOrderCategory());
                categoryRepo.save(category);
            }
        }
    }

    @Override
    public FileInfo registerCategory(CategoryRegistration dto) {
        var checkCate = categoryRepo.findByTitle(dto.getTitle().trim().toLowerCase());

        if(checkCate.isPresent()) {
            throw new CommonException(ErrorCode.CATEGORY_EXISTED);
        }

        FileInfo fileInfo = dto.getIcon();
        //Get presinged URL for client put to S3
        final String objectKey = STORAGE_PATH_CATEGORY + System.currentTimeMillis() + "_" + fileInfo.getFileName();
        fileInfo.setObjectKey(storageService.getPresignedUrl(objectKey, true).toString());

        Category category = new Category();
        category.setTitle(dto.getTitle());
        category.setIcon(new FileInfo(fileInfo.getFileName(), objectKey));
        category.setOrderCategory(categoryRepo.getMaxOrderCategory() + 1);

        categoryRepo.save(category);

        return fileInfo;
     }

    @Override
    public FileInfo editCategory(CategoryEdit dto) {
        var category = categoryRepo.findById(dto.getId())
                .orElseThrow(() -> new CommonException(ErrorCode.CATEGORY_NOT_FOUND));
        FileInfo fileInfo = dto.getIcon();

        category.setTitle(dto.getTitle());
        if(fileInfo != null && fileInfo.getObjectKey() == null) {
            //Get presinged URL for client put to S3
            final String objectKey = STORAGE_PATH_CATEGORY + System.currentTimeMillis() + "_" + fileInfo.getFileName();
            fileInfo.setObjectKey(storageService.getPresignedUrl(objectKey, true).toString());

            category.setIcon(new FileInfo(fileInfo.getFileName(), objectKey));
            //remove old icon file in S3
            if (category.getIcon() != null) {
                storageService.remove(category.getIcon().getObjectKey());
            }
        }

        categoryRepo.save(category);

        return fileInfo;
    }

    @Override
    public void deleteCategory(long id) {
        Category category = categoryRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.CATEGORY_NOT_FOUND));

        categoryRepo.delete(id);

        //remove old icon file in S3
        if (category.getIcon() != null) {
            storageService.remove(category.getIcon().getObjectKey());
        }
    }

    @Override
    public Page<AdminBrandDetail> getBrandByPage(Long categoryId, String term, Pageable pageable) {

        return brandRepo.getBrandByPage(categoryId, term, pageable)
                .map(b -> mapper.map(b, AdminBrandDetail.class));
    }

    @Override
    @Transactional
    public FileInfo registerBrand(BrandRegistration dto) {
        Category category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new CommonException(ErrorCode.CATEGORY_NOT_FOUND));

        var checkBrand = brandRepo.findByBrandName(dto.getBrandName().toLowerCase());
        if(checkBrand.isPresent()) {
            throw new CommonException(ErrorCode.BRAND_EXISTED);
        }

        FileInfo fileInfo = dto.getAttachFile();
        //Get presinged URL for client put to S3
        final String objectKey = STORAGE_PATH_BRAND + System.currentTimeMillis() + "_" + fileInfo.getFileName();
        fileInfo.setObjectKey(storageService.getPresignedUrl(objectKey, true).toString());

        Brand brand = mapper.map(dto, Brand.class);
        brand.setCategory(category);
        brand.setAttachFile(new FileInfo(fileInfo.getFileName(), objectKey));
        brand.setId(0);

        brandRepo.save(brand);

        return fileInfo;
    }

    @Override
    @Transactional
    public FileInfo updateBrand(BrandRegistration dto) {

        Brand brand = brandRepo.findById(dto.getId())
                .orElseThrow(() -> new CommonException(ErrorCode.BRAND_NOT_FOUND));

        //check updated attach file
        FileInfo fileInfo = dto.getAttachFile();
        if (!StringUtils.isEmpty(fileInfo.getObjectKey())) {
            //Get presinged URL for client put to S3
            final String objectKey = STORAGE_PATH_BRAND + System.currentTimeMillis() + "_" + fileInfo.getFileName();
            fileInfo.setObjectKey(storageService.getPresignedUrl(objectKey, true).toString());
            //Remove old objectKey
            storageService.remove(brand.getAttachFile().getObjectKey());

            brand.setAttachFile(new FileInfo(fileInfo.getFileName(), objectKey));
        } else {
            fileInfo = null;
        }

        Category category = brand.getCategory();
        //check updated blackbox
        if (dto.getCategoryId() != 0 && brand.getCategory().getId() != dto.getCategoryId()) {
            category = categoryRepo.findById(dto.getCategoryId())
                    .orElseThrow(() -> new CommonException(ErrorCode.CATEGORY_NOT_FOUND));
        }

        brand.setBrandName(dto.getBrandName());
        brand.setConnectionURL(dto.getConnectionURL());
        brand.setIntroduction(dto.getIntroduction());
        brand.setCategory(category);

        brandRepo.save(brand);

        return fileInfo;
    }

    @Override
    @Transactional
    public void deleteBrand(long id) {
        Brand brand = brandRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.BRAND_NOT_FOUND));

        brandRepo.delete(id);

        //remove attach file in S3
        if (brand.getAttachFile() != null) {
            storageService.remove(brand.getAttachFile().getObjectKey());
        }
    }

    @Override
    public Page<CarTypeDetail> getCarTypeByPage(EProductType productType, Long brandId, Long modelId,
                                                Long carTypeId, Pageable pageable) {

        if (carTypeId != null) {
            return carTypeRepo.getByIdAndProductType(carTypeId, productType, pageable)
                    .map(c -> mapper.map(c, CarTypeDetail.class));
        } else {
            return carTypeRepo.getByPage(productType, brandId, modelId, pageable)
                    .map(c -> mapper.map(c, CarTypeDetail.class));
        }
    }

    @Override
    public FileInfo updateCarType(CarTypeRegistration dto) {

        CarType carType = carTypeRepo.findById(dto.getId())
                .orElseThrow(() -> new CommonException(ErrorCode.CAR_TYPE_NOT_FOUND));
        //check updated attach file
        FileInfo fileInfo = dto.getAttachFile();
        if (!StringUtils.isEmpty(fileInfo.getObjectKey())) {
            //Get presinged URL for client put to S3
            final String objectKey = STORAGE_PATH_CAR_TYPE + System.currentTimeMillis() + "_" + fileInfo.getFileName();
            fileInfo.setObjectKey(storageService.getPresignedUrl(objectKey, true).toString());
            //Remove old objectKey
            storageService.remove(fileInfo.getObjectKey());

            carType.setAttachFile(new FileInfo(fileInfo.getFileName(), objectKey));
        } else {
            fileInfo = null;
        }
        // check update brand
        if (carType.getBrand().getId() != dto.getBrandId()) {
            Brand brand = brandRepo.findById(dto.getBrandId())
                    .orElseThrow(() -> new CommonException(ErrorCode.BRAND_NOT_FOUND));

            carType.setBrand(brand);
        }
        //check update model
        if (carType.getModel() == null || (carType.getModel().getId() != dto.getModelId())) {
            Model model = modelRepo.findById(dto.getModelId())
                    .orElseThrow(() -> new CommonException(ErrorCode.MODEL_NOT_FOUND));

            carType.setModel(model);
        }

        carType.setName(dto.getName());
        carType.setProductType(dto.getProductType());

        carTypeRepo.save(carType);

        return fileInfo;
    }

    @Override
    @Transactional
    public void registerCarType(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        InputStream inputStream = file.getInputStream();
        // Get Workbook: .xlsx or .xls
        Workbook workbook = getWorkbook(inputStream, fileName);
        // Get sheet
        Sheet sheet = workbook.getSheetAt(0);
        // Get all rows
        Iterator<Row> iterator = sheet.iterator();
        while (iterator.hasNext()) {
            Row nextRow = iterator.next();
            if (nextRow.getRowNum() == 0) {
                // Ignore header
                continue;
            }
            // Get all cells
            Iterator<Cell> cellIterator = nextRow.cellIterator();
            CarTypeRegistrationFile carTypeRegis = new CarTypeRegistrationFile();
            while (cellIterator.hasNext()) {
                //Read cell
                Cell cell = cellIterator.next();
                if (cell == null) {
                    continue;
                }
                // Set value for CarTypeRegistrationFile object
                int columnIndex = cell.getColumnIndex();
                switch (columnIndex) {
                    case COLUMN_INDEX_NO:
                        carTypeRegis.setIndex(cell.getNumericCellValue());
                        break;
                    case COLUMN_INDEX_PRODUCT_TYPE:
                        carTypeRegis.setProductType(cell.getStringCellValue());
                        break;
                    case COLUMN_INDEX_BRAND:
                        carTypeRegis.setBrand(cell.getStringCellValue());
                        break;
                    case COLUMN_INDEX_MODEL:
                        carTypeRegis.setModel(cell.getStringCellValue());
                        break;
                    case COLUMN_INDEX_CAR_TYPE:
                        carTypeRegis.setCarType(cell.getStringCellValue());
                        break;
                    default:
                        break;
                }

            }
            //insert to DB
            newCarType(carTypeRegis);
        }

        workbook.close();
        inputStream.close();
    }

    @Override
    public void deleteCarType(long id) {
        CarType carType = carTypeRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.CAR_TYPE_NOT_FOUND));

        carTypeRepo.delete(id);

        //remove attach file in S3
        if (carType.getAttachFile() != null) {
            storageService.remove(carType.getAttachFile().getObjectKey());
        }
    }

    @Override
    public List<BrandInfo> getAllBrand() {
        List<Brand> brands = brandRepo.findAll();

        List<BrandInfo> brandInfos = new ArrayList<>();
        if (brands != null && !brands.isEmpty()) {
            brandInfos = brands.stream()
                    .map(b -> mapper.map(b, BrandInfo.class))
                    .collect(Collectors.toList());
        }

        return brandInfos;
    }

    @Override
    public Page<BrandInfo> getAllBrand(Pageable pageable) {

        return brandRepo.getBrandByPage(null, null, pageable)
                .map(b -> mapper.map(b, BrandInfo.class));
    }

    @Override
    public Page<BrandInfo> getAllBrandsByCategoryId(long categoryId, Pageable pageable) {

        return brandRepo.getBrandByPage(categoryId, null, pageable)
                .map(b -> mapper.map(b, BrandInfo.class));
    }

    @Override
    public BrandDetail getBrandDetail(long id) {
        Brand brand = brandRepo.findById(id)
                .orElseThrow(() -> new CommonException(ErrorCode.BRAND_NOT_FOUND));

        return mapper.map(brand, BrandDetail.class);
    }

    @Override
    public List<ModelInfo> getAllModelByBrandId(long brandId) {
        List<Model> models = modelRepo.getAllModelByBrandId(brandId);

        if (models != null && !models.isEmpty()) {
            return models.stream()
                    .map(m -> mapper.map(m, ModelInfo.class))
                    .collect(Collectors.toList());
        } else {
            return Collections.EMPTY_LIST;
        }
    }

    @Override
    public Page<ModelInfo> getAllModelByBrandId(long brandId, Pageable pageable) {
        var models = modelRepo.getAllModelByBrandId(brandId, pageable);

        if (models != null && !models.isEmpty()) {
            return models.map(m -> mapper.map(m, ModelInfo.class));
        } else {
            return null;
        }
    }

    @Override
    public Page<ModelInfo> searchModelsByName(String term, Pageable pageable) {
        if (StringUtils.isBlank(term)) {
            return null;
        }

        var models = modelRepo.searchLikeByName(term, pageable);

        if (models != null && !models.isEmpty()) {
            return models.map(m -> mapper.map(m, ModelInfo.class));
        } else {
            return null;
        }
    }

    @Override
    public List<CarTypeInfo> getAllCarTypeByModelId(long modelId) {
        List<CarType> carTypes = carTypeRepo.getByModelId(modelId);

        if (carTypes != null && !carTypes.isEmpty()) {
            return carTypes.stream()
                    .map(m -> mapper.map(m, CarTypeInfo.class))
                    .collect(Collectors.toList());
        } else {
            return null;
        }
    }

    @Override
    public Page<CarTypeInfo> getAllCarTypeByModelId(long modelId, Pageable pageable) {
        var carTypes = carTypeRepo.getByModelId(modelId, pageable);

        if (carTypes != null && !carTypes.isEmpty()) {
            return carTypes.map(m -> mapper.map(m, CarTypeInfo.class));
        } else {
            return null;
        }
    }

    @Override
    public void registerMyCar(MyCarRegistration dto) {
        CarType carType = carTypeRepo.findById(dto.getCarTypeId())
                .orElseThrow(() -> new CommonException(ErrorCode.CAR_TYPE_NOT_FOUND));

        UserDetails userDetails = authenticationFacade.getAuthentication();
        Member user = memberRepo.findById(userDetails.getUserId())
                .orElseThrow(() -> new CommonException(ErrorCode.USER_NOT_FOUND));

        user.setCarType(carType);
        user.setCarNumber(dto.getCarNumber());

        memberRepo.save(user);
    }

    private Workbook getWorkbook(InputStream inputStream, String excelFilePath) throws IOException {
        Workbook workbook = null;
        if (excelFilePath.endsWith("xlsx")) {
            workbook = new XSSFWorkbook(inputStream);
        } else if (excelFilePath.endsWith("xls")) {
            workbook = new HSSFWorkbook(inputStream);
        } else {
            throw new CommonException(ErrorCode.CAR_TYPE_REGISTER_FILE_EXTENSION);
        }

        return workbook;
    }

    private void newCarType(CarTypeRegistrationFile dto) {
        EProductType productType;
        Brand brand;
        Model model = null;
        if (dto.getProductType() == null || StringUtils.isBlank(dto.getProductType())) {
            throw new CommonException(ErrorCode.CAR_TYPE_REGISTER_FAIL);
        } else if (EProductType.DOMESTIC.getKoreanName().equals(dto.getProductType().trim())) {
            productType = EProductType.DOMESTIC;
        } else if (EProductType.FOREIGN.getKoreanName().equals(dto.getProductType().trim())) {
            productType = EProductType.FOREIGN;
        } else {
            throw new CommonException(ErrorCode.CAR_TYPE_REGISTER_FAIL);
        }

        if (dto.getBrand() == null || StringUtils.isBlank(dto.getBrand())) {
            throw new CommonException(ErrorCode.CAR_TYPE_REGISTER_FAIL);
        } else {
            brand = brandRepo.findByBrandName(dto.getBrand().trim().toLowerCase()).orElse(null);
            if (brand == null) {
                throw new CommonException(ErrorCode.CAR_TYPE_REGISTER_FAIL);
            }
        }

        if (dto.getModel() != null && !StringUtils.isBlank(dto.getModel())) {
            model = modelRepo.findByBrandAndModelName(brand, dto.getModel().trim().toLowerCase())
                    .orElse(null);

            if (model == null) {
                Model newModel = new Model();
                newModel.setModelBrand(brand);
                newModel.setModelName(dto.getModel());

                model = modelRepo.save(newModel);
            }
        }

        CarType carType = new CarType();
        carType.setProductType(productType);
        carType.setBrand(brand);
        carType.setModel(model);
        carType.setAttachFile(new FileInfo());
        carType.setName(dto.getCarType());

        carTypeRepo.save(carType);
    }
}
