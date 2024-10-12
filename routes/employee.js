const express = require('express');
const {
    getAllEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} = require('../controllers/employeeController');

const router = express.Router();

// GET /api/v1/emp/employees
router.get('/employees', getAllEmployees);

// POST /api/v1/emp/employees
router.post('/employees', createEmployee);

// GET /api/v1/emp/employees/:eid
router.get('/employees/:eid', getEmployeeById);

// PUT /api/v1/emp/employees/:eid
router.put('/employees/:eid', updateEmployee);

// DELETE /api/v1/emp/employees
router.delete('/employees', deleteEmployee);

module.exports = router;
