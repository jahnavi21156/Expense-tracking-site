package com.boomi.expense.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boomi.expense.model.Expense;



public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	List<Expense> findAllByOrderByDateDesc();
	
	List<Expense> findByUserEmailOrderByDateDesc(String email);
	 
	List<Expense> findByUserEmail(String email);
	
	List<Expense> findByUserEmailAndDateGreaterThanOrderByDateAsc(String email, String date);
	
	List<Expense> findAllByDateGreaterThanOrderByDateAsc(String date);
	
	List<Expense> deleteById(String id);
}
