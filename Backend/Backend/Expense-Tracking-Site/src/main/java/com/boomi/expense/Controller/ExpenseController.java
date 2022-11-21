package com.boomi.expense.Controller;

import java.net.http.HttpHeaders;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.boomi.expense.Repository.ExpenseRepository;
import com.boomi.expense.config.JwtTokenFilter;
import com.boomi.expense.config.JwtTokenProvider;
import com.boomi.expense.model.Expense;

import io.jsonwebtoken.Claims;

@RestController
public class ExpenseController {
	
	private static Logger log = LoggerFactory.getLogger(ExpenseController.class);

	
	@Autowired 
	private ExpenseRepository expenseRepository;
		
	
	@Autowired
	private JwtTokenProvider tokenProvider;
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/expenses")
	@ResponseBody
	public List<Expense> getExpenses(@RequestHeader Map<String,String> headers) {	
//		log.info(headers.get("authorization"));
		Claims claims=tokenProvider.getClaimsFromToken(headers.get("authorization"));
		log.info(String.valueOf(claims));
		log.info(claims.getSubject());
		return (List<Expense>) expenseRepository.findByUserEmailOrderByDateDesc(claims.getSubject());
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/balance")
	@ResponseBody
	public String getBalance(@RequestHeader Map<String,String> headers) {
		log.info("ddd");
		double balance = 0;
		Claims claims=tokenProvider.getClaimsFromToken(headers.get("authorization"));
		log.info(String.valueOf(claims));
		log.info(claims.getSubject());
		
		List<Expense> expenses = expenseRepository.findByUserEmail(claims.getSubject());
		
		for(int i = 0; i < expenses.size(); i++) {
			balance += expenses.get(i).getCost();
		}
		System.out.println(balance);
		DecimalFormat df = new DecimalFormat("#.##");
		String formattedBalance = df.format(balance);
		
		return formattedBalance;
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@PostMapping("/add")
	public void addExpense(@RequestBody Expense expense,@RequestHeader Map<String,String> headers) {
		Claims claims=tokenProvider.getClaimsFromToken(headers.get("authorization"));
		log.info(String.valueOf(claims));
		log.info(claims.getSubject());
		
		Expense expense1= new Expense();
		expense1.setCategory(expense.getCategory());
		expense1.setDate(expense.getDate());
		expense1.setCost(expense.getCost());
		expense1.setDescription(expense.getDescription());
		expense1.setUserEmail(claims.getSubject());
        
		
		expenseRepository.save(expense1);
	}
	
	@CrossOrigin(origins="http://localhost:3000")
	@GetMapping("/recent")
	@ResponseBody
	public List<Expense> getRecentExpenses(@RequestHeader Map<String,String> headers) {	
		Claims claims=tokenProvider.getClaimsFromToken(headers.get("authorization"));
		log.info(String.valueOf(claims));
		log.info(claims.getSubject());
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DAY_OF_YEAR, -7);
		String formattedDate = dateFormat.format(cal.getTime());
		//return expenseRepository.findAllByDateGreaterThanOrderByDateAsc(formattedDate);
		return expenseRepository.findByUserEmailAndDateGreaterThanOrderByDateAsc(claims.getSubject(),formattedDate);
	}
	
	
	@CrossOrigin(origins="http://localhost:3000")
	@DeleteMapping(value = "/delete/{id}")
	public List<Expense> deleteExpense(@PathVariable Long id,@RequestHeader Map<String,String> headers)
	{
		expenseRepository.deleteById(id);
		Claims claims=tokenProvider.getClaimsFromToken(headers.get("authorization"));
		log.info(String.valueOf(claims));
		log.info(claims.getSubject());
		return (List<Expense>) expenseRepository.findByUserEmail(claims.getSubject());
		
		
	}
	
	
	
	

}
