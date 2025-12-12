package com.skillnext2;

import com.mysql.cj.jdbc.AbandonedConnectionCleanupThread;
import java.sql.Driver;
import java.sql.DriverManager;
import java.util.*;

public class App {
    public static void main(String[] args) {
        try {
            EmployeeDAO dao = new EmployeeDAO();

            // Add employee
            Employee e1 = new Employee("John Doe", "john@example.com", 50000);
            dao.addEmployee(e1);
            System.out.println("Employee Added Successfully!");

            // Fetch employees
            List<Employee> employees = dao.getAllEmployees();
            for (Employee e : employees) {
                System.out.println(e);
            }

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Ensure MySQL background cleanup thread is stopped when running via Maven exec
            try {
                AbandonedConnectionCleanupThread.checkedShutdown();
            } catch (Exception ignored) {
                // cleanup best-effort
            }

            Enumeration<Driver> drivers = DriverManager.getDrivers();
            while (drivers.hasMoreElements()) {
                Driver driver = drivers.nextElement();
                if (driver.getClass().getClassLoader() == App.class.getClassLoader()) {
                    try {
                        DriverManager.deregisterDriver(driver);
                    } catch (Exception ignored) {
                        // ignore
                    }
                }
            }
        }
    }
}
