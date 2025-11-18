// components/ReqForm.jsx
import React, { useState, useEffect } from 'react';
import logo from '../assets/ecilnewlogo.jpg';
import { skilledSubcats, skilledntSubcats,semiskilledSubcats,unskilledSubcats } from '../assets/assets';

const ReqForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    selectedDivision: '',
    selectedPeriod: '',
    dateOfCommencement: '',
    expectedDateOfCompletion: '',
    natureOfWork: '',
    projectName: '',
    workOrderNo: '',
    valueOfWorkOrder: '',
    skilledApprovedNumber: 0,
    skilledApprovedCost: 0,
    skilledActualNumber: 0,
    skilledActualCost: 0,
    semiSkilledApprovedNumber: 0,
    semiSkilledApprovedCost: 0,
    semiSkilledActualNumber: 0,
    semiSkilledActualCost: 0,
    unSkilledApprovedNumber: 0,
    unSkilledApprovedCost: 0,
    unSkilledActualNumber: 0,
    unSkilledActualCost: 0,
    remarks: '',
  });

  // State for dynamic sub-category sections
  const [skChoices, setSkChoices] = useState([{ id: 0, subcattype: '', manhours: 0 }]);
  const [skntChoices, setSkntChoices] = useState([{ id: 0, subcattype: '', manhours: 0 }]);
  const [sskChoices, setSskChoices] = useState([{ id: 0, subcattype: '', manhours: 0 }]);
  const [uskChoices, setUskChoices] = useState([{ id: 0, subcattype: '', manhours: 0 }]);

  // Totals for each category
  const [skilledTotal, setSkilledTotal] = useState(0);
  const [skilledntTotal, setSkilledntTotal] = useState(0);
  const [semiskilledTotal, setSemiskilledTotal] = useState(0);
  const [unskilledTotal, setUnskilledTotal] = useState(0);

  // Wage and working days (hardcoded as per the Angular form)
  const skilledCost = 954;
  const skilledntCost = 954;
  const semiskilledCost = 868;
  const unskilledCost = 783;
  const [workingDays, setWorkingDays] = useState(0); // Calculate based on dates

  // Dropdown options (from the Angular form)
  const divisionList = [{ divisionShortName: 'SSSD' }];
  const timePeriodOptions = [
    'Extraneous Manpower for other than Projects',
    'Extraneous Manpower for Projects',
  ];


  // const semiskilledSubcats = [
  //   { scat_id: 'SCAT027', name: 'Assistant (Stocker)' },
  //   { scat_id: 'SCAT028', name: 'Accounts clerk' },
  //   // Add all other options
  // ];
  // const unskilledSubcats = [
  //   { scat_id: 'SCAT048', name: 'Attendant' },
  //   { scat_id: 'SCAT049', name: 'Cleaner' },
  //   // Add all other options
  // ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Autofill fields when "Extraneous Manpower for other than Projects" is selected
  useEffect(() => {
    if (formData.selectedPeriod === 'Extraneous Manpower for other than Projects') {
      setFormData((prev) => ({
        ...prev,
        natureOfWork: 'Non-Project Work',
        projectName: 'N/A',
        workOrderNo: 'N/A',
        valueOfWorkOrder: 'N/A',
      }));
    } else if (formData.selectedPeriod === 'Extraneous Manpower for Projects') {
      // Clear the fields if switching to "Projects" (or leave as user-editable)
      setFormData((prev) => ({
        ...prev,
        natureOfWork: '',
        projectName: '',
        workOrderNo: '',
        valueOfWorkOrder: '',
      }));
    }
  }, [formData.selectedPeriod]);

  // Calculate working days between dates
  useEffect(() => {
    if (formData.dateOfCommencement && formData.expectedDateOfCompletion) {
      const startDate = new Date(formData.dateOfCommencement);
      const endDate = new Date(formData.expectedDateOfCompletion);
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setWorkingDays(diffDays);
    }
  }, [formData.dateOfCommencement, formData.expectedDateOfCompletion]);

  // Calculate totals for each category
  const calculateTotals = (choices, setTotal, wage) => {
    const totalManhours = choices.reduce((sum, choice) => sum + (Number(choice.manhours) || 0), 0);
    const totalCost = totalManhours * wage * workingDays;
    setTotal(totalCost);
  };

  // Add new sub-category row
  const addNewChoice = (choices, setChoices) => {
    const newChoice = { id: choices.length, subcattype: '', manhours: 0 };
    setChoices([...choices, newChoice]);
  };

  // Remove a sub-category row
  const removeChoice = (index, choices, setChoices, setTotal, wage) => {
    const updatedChoices = choices.filter((_, i) => i !== index);
    // Reassign IDs to maintain sequential order
    const reindexedChoices = updatedChoices.map((choice, i) => ({ ...choice, id: i }));
    setChoices(reindexedChoices);
    calculateTotals(reindexedChoices, setTotal, wage);
  };

  // Handle sub-category changes
  const handleSubcatChange = (index, field, value, choices, setChoices, setTotal, wage) => {
    const updatedChoices = [...choices];
    updatedChoices[index][field] = value;
    setChoices(updatedChoices);
    calculateTotals(updatedChoices, setTotal, wage);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here (e.g., API call)
    console.log('Form submitted:', { ...formData, skChoices, skntChoices, sskChoices, uskChoices });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg">
        <div className="border-2 border-blue-500 p-4">
          <form onSubmit={handleSubmit}>
            <h4 className="text-xl font-bold text-center mb-4">Requisition for Extraneous Manpower</h4>

            <div className="text-center mb-4">
              <img
                src={logo}
                alt="Electronics Corporation of India Limited logo"
                className="float-left mr-4"
                style={{ width: '80px', height: '80px' }}
              />
              <h6 className="text-sm font-semibold">
                इलेक्ट्रानिक्स कारपोरेशन ऑफ इंण्डिया लिमिटेड <br />
                ELECTRONICS CORPORATION OF INDIA LIMITED
              </h6>
              <h6 className="text-sm font-semibold">मांगपत्र: मैनपॉवर</h6>
              <h6 className="text-sm font-semibold">Requisition for Extraneous Manpower</h6>
            </div>
            <hr className="border-t-2 border-dashed border-[#0f2b50] mb-4" />

            <div className="p-4">
              {/* Form Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label htmlFor="div" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Division
                  </label>
                  <select
                    name="selectedDivision"
                    value={formData.selectedDivision}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Division</option>
                    {divisionList.map((div) => (
                      <option key={div.divisionShortName} value={div.divisionShortName}>
                        {div.divisionShortName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="timeper" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Type
                  </label>
                  <select
                    name="selectedPeriod"
                    value={formData.selectedPeriod}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Type</option>
                    {timePeriodOptions.map((tp) => (
                      <option key={tp} value={tp}>
                        {tp}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="fromdate" className="block text-sm font-medium text-gray-700 mb-1">
                    Date Of Commencement
                  </label>
                  <input
                    type="date"
                    name="dateOfCommencement"
                    value={formData.dateOfCommencement}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="2025-05-31"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="todate" className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Date Of Completion
                  </label>
                  <input
                    type="date"
                    name="expectedDateOfCompletion"
                    value={formData.expectedDateOfCompletion}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Form Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label htmlFor="natureof" className="block text-sm font-medium text-gray-700 mb-1">
                    Nature Of Work/Job
                  </label>
                  <input
                    type="text"
                    name="natureOfWork"
                    value={formData.natureOfWork}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="projectname" className="block text-sm font-medium text-gray-700 mb-1">
                    Name Of The Project
                  </label>
                  <input
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="orderno" className="block text-sm font-medium text-gray-700 mb-1">
                    Work Order No.
                  </label>
                  <input
                    type="text"
                    name="workOrderNo"
                    value={formData.workOrderNo}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="valueorder" className="block text-sm font-medium text-gray-700 mb-1">
                    Value Of The Work Order
                  </label>
                  <input
                    type="text"
                    name="valueOfWorkOrder"
                    value={formData.valueOfWorkOrder}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Table */}
              <div className="mb-4">
                <table className="w-full border border-black border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-black p-2"></th>
                      <th className="border border-black p-2"></th>
                      <th colSpan="2" className="border border-black p-2 text-center">
                        AS PER APPROVED COST SHEET (a)
                      </th>
                      <th colSpan="2" className="border border-black p-2 text-center">
                        ACTUAL DEPLOYMENT & EXPENDITURE UPTO 31.03.2025
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-black p-2">Sl.No</th>
                      <th className="border border-black p-2">Manpower</th>
                      <th className="border border-black p-2">Number</th>
                      <th className="border border-black p-2">Rs.</th>
                      <th className="border border-black p-2">Number</th>
                      <th className="border border-black p-2">Rs.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-black p-2">1.</td>
                      <td className="border border-black p-2">Skilled</td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="skilledApprovedNumber"
                          value={formData.skilledApprovedNumber}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="skilledApprovedCost"
                          value={formData.skilledApprovedCost}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="skilledActualNumber"
                          value={formData.skilledActualNumber}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="skilledActualCost"
                          value={formData.skilledActualCost}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2">2.</td>
                      <td className="border border-black p-2">Semi-Skilled</td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="semiSkilledApprovedNumber"
                          value={formData.semiSkilledApprovedNumber}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="semiSkilledApprovedCost"
                          value={formData.semiSkilledApprovedCost}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="semiSkilledActualNumber"
                          value={formData.semiSkilledActualNumber}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="semiSkilledActualCost"
                          value={formData.semiSkilledActualCost}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2">3.</td>
                      <td className="border border-black p-2">Un Skilled</td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="unSkilledApprovedNumber"
                          value={formData.unSkilledApprovedNumber}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="unSkilledApprovedCost"
                          value={formData.unSkilledApprovedCost}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="unSkilledActualNumber"
                          value={formData.unSkilledActualNumber}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          name="unSkilledActualCost"
                          value={formData.unSkilledActualCost}
                          onChange={handleInputChange}
                          className="w-full p-1 border-0 focus:outline-none"
                          required
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-2"></td>
                      <td className="border border-black p-2">Total (A)</td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          value={
                            (Number(formData.skilledApprovedNumber) || 0) +
                            (Number(formData.semiSkilledApprovedNumber) || 0) +
                            (Number(formData.unSkilledApprovedNumber) || 0)
                          }
                          className="w-full p-1 border-0 focus:outline-none"
                          readOnly
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          value={
                            (Number(formData.skilledApprovedCost) || 0) +
                            (Number(formData.semiSkilledApprovedCost) || 0) +
                            (Number(formData.unSkilledApprovedCost) || 0)
                          }
                          className="w-full p-1 border-0 focus:outline-none"
                          readOnly
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          value={
                            (Number(formData.skilledActualNumber) || 0) +
                            (Number(formData.semiSkilledActualNumber) || 0) +
                            (Number(formData.unSkilledActualNumber) || 0)
                          }
                          className="w-full p-1 border-0 focus:outline-none"
                          readOnly
                        />
                      </td>
                      <td className="border border-black p-2">
                        <input
                          type="number"
                          value={
                            (Number(formData.skilledActualCost) || 0) +
                            (Number(formData.semiSkilledActualCost) || 0) +
                            (Number(formData.unSkilledActualCost) || 0)
                          }
                          className="w-full p-1 border-0 focus:outline-none"
                          readOnly
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Divisional Present Strength */}
              <h5 className="text-lg font-semibold mb-3">
                Divisional Present Strength (For the Year 2024-2025)
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="tskt" className="block text-sm font-medium text-gray-700 mb-1">
                    Skilled
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="tssk" className="block text-sm font-medium text-gray-700 mb-1">
                    Semi Skilled
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="tusk" className="block text-sm font-medium text-gray-700 mb-1">
                    Unskilled
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>
              <br />

              <h5 className="text-lg font-semibold mb-3 text-center">
                Extraneous Manpower Requirement for the Financial Year 2025-2026
              </h5>

              {/* Skilled Tech */}
              <h5 className="text-lg font-semibold mb-3">Skilled Tech</h5>
              {skChoices.map((choice, index) => (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-end" key={choice.id}>
                  <div>
                    <label htmlFor={`skid-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Sub-Cat Type
                    </label>
                    <select
                      value={choice.subcattype}
                      onChange={(e) =>
                        handleSubcatChange(index, 'subcattype', e.target.value, skChoices, setSkChoices, setSkilledTotal, skilledCost)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Sub-Category</option>
                      {skilledSubcats.map((subcat) => (
                        <option key={subcat.scat_id} value={subcat.scat_id}>
                          {subcat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`skman-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      No Of Cont Labour Required
                    </label>
                    <input
                      type="number"
                      value={choice.manhours}
                      onChange={(e) =>
                        handleSubcatChange(index, 'manhours', e.target.value, skChoices, setSkChoices, setSkilledTotal, skilledCost)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      disabled={!choice.subcattype}
                      required
                    />
                  </div>
                  <div>
                    {skChoices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(index, skChoices, setSkChoices, setSkilledTotal, skilledCost)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <p className="text-sm mr-2">To add a new sub-category type:</p>
                <button
                  type="button"
                  onClick={() => addNewChoice(skChoices, setSkChoices)}
                  className="bg-blue-200 text-black px-4 py-1 rounded hover:bg-blue-300"
                >
                  Click here
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="skilled_cost" className="block text-sm font-medium text-gray-700 mb-1">
                    Wage/Day
                  </label>
                  <input
                    type="number"
                    value={skilledCost}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="workingDays" className="block text-sm font-medium text-gray-700 mb-1">
                    Working Days
                  </label>
                  <input
                    type="number"
                    value={workingDays}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="skilled_total" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Cost
                  </label>
                  <input
                    type="number"
                    value={skilledTotal}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              {/* Skilled Non-Tech */}
              <h5 className="text-lg font-semibold mb-3">Skilled Non-Tech</h5>
              {skntChoices.map((choice, index) => (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-end" key={choice.id}>
                  <div>
                    <label htmlFor={`skntid-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Sub-Cat Type
                    </label>
                    <select
                      value={choice.subcattype}
                      onChange={(e) =>
                        handleSubcatChange(index, 'subcattype', e.target.value, skntChoices, setSkntChoices, setSkilledntTotal, skilledntCost)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Sub-Category</option>
                      {skilledntSubcats.map((subcat) => (
                        <option key={subcat.scat_id} value={subcat.scat_id}>
                          {subcat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`skntman-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      No Of Cont Labour Required
                    </label>
                    <input
                      type="number"
                      value={choice.manhours}
                      onChange={(e) =>
                        handleSubcatChange(index, 'manhours', e.target.value, skntChoices, setSkntChoices, setSkilledntTotal, skilledntCost)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      disabled={!choice.subcattype}
                      required
                    />
                  </div>
                  <div>
                    {skntChoices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(index, skntChoices, setSkntChoices, setSkilledntTotal, skilledntCost)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <p className="text-sm mr-2">To add a new sub-category type:</p>
                <button
                  type="button"
                  onClick={() => addNewChoice(skntChoices, setSkntChoices)}
                  className="bg-blue-200 text-black px-4 py-1 rounded hover:bg-blue-300"
                >
                  Click here
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="skillednt_cost" className="block text-sm font-medium text-gray-700 mb-1">
                    Wage
                  </label>
                  <input
                    type="number"
                    value={skilledntCost}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="workingDays" className="block text-sm font-medium text-gray-700 mb-1">
                    Working Days
                  </label>
                  <input
                    type="number"
                    value={workingDays}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="skillednt_total" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Cost
                  </label>
                  <input
                    type="number"
                    value={skilledntTotal}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              {/* Semi-Skilled */}
              <h5 className="text-lg font-semibold mb-3">Semi-Skilled</h5>
              {sskChoices.map((choice, index) => (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-end" key={choice.id}>
                  <div>
                    <label htmlFor={`sskid-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Sub-Cat Type
                    </label>
                    <select
                      value={choice.subcattype}
                      onChange={(e) =>
                        handleSubcatChange(index, 'subcattype', e.target.value, sskChoices, setSskChoices, setSemiskilledTotal, semiskilledCost)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Sub-Category</option>
                      {semiskilledSubcats.map((subcat) => (
                        <option key={subcat.scat_id} value={subcat.scat_id}>
                          {subcat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`sskman-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      No Of Cont Labour Required
                    </label>
                    <input
                      type="number"
                      value={choice.manhours}
                      onChange={(e) =>
                        handleSubcatChange(index, 'manhours', e.target.value, sskChoices, setSskChoices, setSemiskilledTotal, semiskilledCost)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      disabled={!choice.subcattype}
                      required
                    />
                  </div>
                  <div>
                    {sskChoices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(index, sskChoices, setSskChoices, setSemiskilledTotal, semiskilledCost)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <p className="text-sm mr-2">To add a new sub-category type:</p>
                <button
                  type="button"
                  onClick={() => addNewChoice(sskChoices, setSskChoices)}
                  className="bg-blue-200 text-black px-4 py-1 rounded hover:bg-blue-300"
                >
                  Click here
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="semiskilled_cost" className="block text-sm font-medium text-gray-700 mb-1">
                    Wage
                  </label>
                  <input
                    type="number"
                    value={semiskilledCost}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="workingDays" className="block text-sm font-medium text-gray-700 mb-1">
                    Working Days
                  </label>
                  <input
                    type="number"
                    value={workingDays}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="semiskilled_total" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Cost
                  </label>
                  <input
                    type="number"
                    value={semiskilledTotal}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              {/* Un-Skilled */}
              <h5 className="text-lg font-semibold mb-3">Un-Skilled</h5>
              {uskChoices.map((choice, index) => (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 items-end" key={choice.id}>
                  <div>
                    <label htmlFor={`uskid-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      Sub-Cat Type
                    </label>
                    <select
                      value={choice.subcattype}
                      onChange={(e) =>
                        handleSubcatChange(index, 'subcattype', e.target.value, uskChoices, setUskChoices, setUnskilledTotal, unskilledCost)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Sub-Category</option>
                      {unskilledSubcats.map((subcat) => (
                        <option key={subcat.scat_id} value={subcat.scat_id}>
                          {subcat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`uskman-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                      No Of Cont Labour Required
                    </label>
                    <input
                      type="number"
                      value={choice.manhours}
                      onChange={(e) =>
                        handleSubcatChange(index, 'manhours', e.target.value, uskChoices, setUskChoices, setUnskilledTotal, unskilledCost)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      min="1"
                      disabled={!choice.subcattype}
                      required
                    />
                  </div>
                  <div>
                    {uskChoices.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeChoice(index, uskChoices, setUskChoices, setUnskilledTotal, unskilledCost)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <div className="flex items-center mb-4">
                <p className="text-sm mr-2">To add a new sub-category type:</p>
                <button
                  type="button"
                  onClick={() => addNewChoice(uskChoices, setUskChoices)}
                  className="bg-blue-200 text-black px-4 py-1 rounded hover:bg-blue-300"
                >
                  Click here
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="unskilled_cost" className="block text-sm font-medium text-gray-700 mb-1">
                    Wage
                  </label>
                  <input
                    type="number"
                    value={unskilledCost}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="workingDays" className="block text-sm font-medium text-gray-700 mb-1">
                    Working Days
                  </label>
                  <input
                    type="number"
                    value={workingDays}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
                <div>
                  <label htmlFor="unskilled_total" className="block text-sm font-medium text-gray-700 mb-1">
                    Total Cost
                  </label>
                  <input
                    type="number"
                    value={unskilledTotal}
                    className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              {/* Remarks */}
              <div className="mb-4">
                <label htmlFor="remarks" className="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-10"
                  maxLength="1000"
                  required
                />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex justify-center mt-3">
                <input
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                  value="Submit"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReqForm;