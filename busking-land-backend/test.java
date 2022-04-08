  @Service
  public class S3ServicesImpl implements S3Services {

      private Logger logger = LoggerFactory.getLogger(S3ServicesImpl.class);

      @Autowired
      private AmazonS3 s3client;

      @Value("${mpd.s3.bucket}")
      private String bucketName;

      @Override
      public void downloadFile(String keyName) {
          try {
              System.out.println("Downloading an object.");
              S3Object s3object = s3client.getObject(new GetObjectRequest(bucketName, keyName));
              System.out.println("Content-Type: " + s3object.getObjectMetadata().getContentType());
              Utitlity.displayText(s3object.getObjectContent());
              logger.info("===================== Import File - Done! =====================");

          } catch (AmazonServiceException ase) {
              logger.info("Caught an AmazonServiceException from GET requests, rejected reasons:");
              logger.info("Error Message:    " + ase.getMessage());
              logger.info("HTTP Status Code: " + ase.getStatusCode());
              logger.info("AWS Error Code:   " + ase.getErrorCode());
              logger.info("Error Type:       " + ase.getErrorType());
              logger.info("Request ID:       " + ase.getRequestId());
          } catch (AmazonClientException ace) {
              logger.info("Caught an AmazonClientException: ");
              logger.info("Error Message: " + ace.getMessage());
          } catch (IOException ioe) {
              logger.info("IOE Error Message: " + ioe.getMessage());
          }
      }

      @Override
      public void uploadFile(String keyName, String uploadFilePath) {
          try {

              File file = new File(uploadFilePath);
              ObjectMetadata objMetadata = new ObjectMetadata();
              objMetadata.setContentLength(15L);
                
              s3client.putObject(new PutObjectRequest(bucketName, keyName, new FileInputStream(file), objMetadata).withCannedAcl(CannedAccessControlList.PublicRead));
              logger.info("===================== Upload File - Done! =====================");

          } catch (AmazonServiceException ase) {
              logger.info("Caught an AmazonServiceException from PUT requests, rejected reasons:");
              logger.info("Error Message:    " + ase.getMessage());
              logger.info("HTTP Status Code: " + ase.getStatusCode());
              logger.info("AWS Error Code:   " + ase.getErrorCode());
              logger.info("Error Type:       " + ase.getErrorType());
              logger.info("Request ID:       " + ase.getRequestId());
          } catch (AmazonClientException ace) {
              logger.info("Caught an AmazonClientException: ");
              logger.info("Error Message: " + ace.getMessage());
          } catch (FileNotFoundException ex) {
              java.util.logging.Logger.getLogger(S3ServicesImpl.class.getName()).log(Level.SEVERE, null, ex);
          }
      }
  }