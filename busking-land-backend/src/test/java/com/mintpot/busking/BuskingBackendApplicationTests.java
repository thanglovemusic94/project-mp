package com.mintpot.busking;

import com.mintpot.busking.model.Busking;
import com.mintpot.busking.repository.BuskingRepository;
import com.mintpot.busking.utils.search.BuskingSpecification;
import com.mintpot.busking.utils.search.SearchCriteria;
import com.mintpot.busking.utils.search.SearchOperation;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

@SpringBootTest
@Log4j2
class BuskingBackendApplicationTests {

	@Autowired
	private BuskingRepository repository;

	@Test
	void contextLoads() {
//		BuskingSpecification spec = new BuskingSpecification(new SearchCriteria("id", SearchOperation.LIKE, "1"));
//		List<Busking> results = repository.findAll(Specification.where(spec));
//		results.forEach(busking -> System.out.println("----busking---: "+ busking));
//		System.out.println();
	}

}
