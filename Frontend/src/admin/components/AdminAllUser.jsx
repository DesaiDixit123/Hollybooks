import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const UserTable = () => {
    const { userData = [] } = useSelector((state) => state.AdminSliceProvider);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // Calculate the index of the last user on the current page
    const indexOfLastUser = currentPage * usersPerPage;
    // Calculate the index of the first user on the current page
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    // Slice the users array to get only the users for the current page
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate the total number of pages
    const totalPages = Math.ceil(userData.length / usersPerPage);

    // Function to handle page changes
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">All Users</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">#</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">User Profileimg</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">First Name</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Last Name</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Email</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Username</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Contact Number</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Address</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Country</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">State</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">City</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Gender</th>
                            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm leading-4 font-semibold text-gray-700">Birth Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(currentUsers) && currentUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border-b border-gray-200">{index + 1 + (currentPage - 1) * usersPerPage}</td>
                                <td className="py-2 px-4 border-b border-gray-200">
                                    <img src={user.profileImg} alt="" className="w-12 h-12 rounded-full object-cover" />
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.fname}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.lname}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.username}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.contact_no}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.address}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.country}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.state}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.city}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.gender}</td>
                                <td className="py-2 px-4 border-b border-gray-200">{user.birth_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-4">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className="px-4 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-md mr-2"
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => handlePageChange(index + 1)} 
                        className={`px-4 py-2 border border-gray-300 rounded-md ${currentPage === index + 1 ? 'bg-gray-200' : 'bg-white'} mr-2`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    className="px-4 py-2 border border-gray-300 bg-gray-100 text-gray-600 rounded-md"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserTable;
