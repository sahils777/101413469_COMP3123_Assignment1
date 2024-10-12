const Employee = require('../models/Employee');

exports.getAllEmployees = async (req, res) => {
    try {
        // Fetch all employees from the database
        const employees = await Employee.find();

        // Return the list of employees in the expected format
        const formattedEmployees = employees.map(employee => ({
            employee_id: employee._id,
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
            date_of_joining: employee.date_of_joining,
            department: employee.department
        }));

        res.status(200).json(formattedEmployees);  // Return the employees in a JSON response
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee_id: newEmployee._id });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        res.status(200).json({ message: 'Employee details updated successfully' });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.query.eid;  // Get employee ID from query parameter
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

        // If employee not found, return a 404 status
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // If employee deleted successfully, send success message
        res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
