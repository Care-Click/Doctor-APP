import React, { useState } from 'react';

const Report = () => {
    // State for dropdown selection and input value
    const [selectedOption, setSelectedOption] = useState('');
    const [description, setdesc] = useState('');

    // Function to handle dropdown selection
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        setdesc(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here, such as submitting to an API or performing other actions
        console.log('Selected option:', selectedOption);
        console.log('Input value:', description);
    };

    return (
        <div className="container mx-auto mt-8">
            <div className="flex justify-center items-center mb-8 border border-grey-900 rounded-md p-4 bg-gray-300">
                {/* Display data */}
                <div className="w-1/2 mr-4 border-r border-gray-300 pr-4">
                    <h2 className="text-lg font-bold mb-4">Medical Information</h2>
                    {/* Placeholder data display */}
                    <p>....</p>
                    <p>....</p>

                    <p>....</p>
                    <p>....</p>

                    <p>....</p>


                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                    <p>....</p>

                </div>
                {/* Dropdown and input form */}
                <div className="w-1/2 ml-4">
                    <h2 className="text-lg font-bold mb-4">Add Information</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Dropdown select */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="dropdown">
                                Select an Information:
                            </label>
                            <select
                                id="dropdown"
                                className="block w-full border border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 bg-white"
                                value={selectedOption}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select an Info...</option>
                                <option value="Familial_Medical_History">Familial Medical History</option>
                                <option value="Allergies">Allergies</option>
                                <option value="PastIllness ">PastIllness </option>
                                <option value="Surgeries  ">Surgeries </option>
                                <option value="Medications  ">Medications  </option>
                                <option value="Chronic_Illness ">Chronic_Illness </option>
                                <option value="Imaging_test_results ">Imaging_test_results </option>
                            </select>
                        </div>
                        {/* Input field */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="inputField">
                                Description:
                            </label>
                            <input
                                id="inputField"
                                type="text"
                                className="block w-full border border-gray-700 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50 bg-white"
                                value={description}
                                onChange={handleInputChange}
                            />
                        </div>
                        {/* Submit button */}
                        <div>
                            <button
                                className="bg-[rgba(242,98,104,0.75)] text-white py-2 px-4 tablet:px-3 rounded hover:bg-[#F26268] flex items-center w-15 ml-50 "
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Report;
