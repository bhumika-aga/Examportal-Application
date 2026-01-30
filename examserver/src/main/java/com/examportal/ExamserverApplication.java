package com.examportal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExamserverApplication implements CommandLineRunner {

	private static final Logger logger = LoggerFactory.getLogger(ExamserverApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(ExamserverApplication.class, args);
		logger.info("Starting Exam Portal Application!");
	}

	@Override
	public void run(String... args) throws Exception {
		logger.info("Exam Portal Application Started Successfully!");
	}
}