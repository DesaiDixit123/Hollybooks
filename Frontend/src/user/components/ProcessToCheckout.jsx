import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart, userPlaceOrder } from "../../redux/ThunkApi";
import { toast } from 'react-toastify';

export default function ProcessToCheckout() {
    const location = useLocation();
    const { total } = location.state || {}; 
    const dispatch = useDispatch();
    const navigate=useNavigate()
    const {userData}=useSelector((state)=>state.MySliceProvider)
    console.log(userData._id)
    // console.log(userData.cart)
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        email: ''
    });



    const formHandler = async (e) => {
        e.preventDefault();

        // Check if all required fields are filled
        for (const [key, value] of Object.entries(formData)) {
            if (!value) {
                alert(`${key} is required`);
                return;
            }
        }
        
        const orderData = {
            userId: userData._id,
            products: [],
            totalAmount: total || 0,  // Default to 0 if total is undefined
            shippingDetails: formData
        };
        

        try {
           
            await dispatch(userPlaceOrder(orderData));

            await dispatch(clearCart(userData._id))
            toast.success('Order Placed successful!');

          
            setTimeout(()=>{
                navigate("/")
            },2000)
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    return (
        <>
            <div className="bg-gray-200 pt-16 flex w-[100%]">
                <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg w-[50%]">
                    <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                    <form className="space-y-6" onSubmit={formHandler}>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                            <select id="country" name="country" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} value={formData.country}>
                                <option value="">Select Country</option>
                                <option value="UNITED STATE">UNITED STATE</option>
                                <option value="INDIA">INDIA</option>
                                <option value="MAHARASTRA">MAHARASTRA</option>
                                <option value="UTRAKHAND">UTRAKHAND</option>
                                <option value="RAJSHAN">RAJSHAN</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" name="fname" id="fname" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} value={formData.fname} required/>
                        </div>
                        <div>
                            <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" name="lname" id="lname" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} value={formData.lname} required/>
                        </div>
                        <div>
                            <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address 1</label>
                            <textarea
                                name="address1"
                                id="address1"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Street Address"
                                onChange={handleChange}
                                value={formData.address1}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Address 2</label>
                            <textarea
                                name="address2"
                                id="address2"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Apartment, Suite, Unit, Floor (optional)"
                                onChange={handleChange}
                                value={formData.address2}
                            ></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <select id="city" name="city" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} value={formData.city} required>
                                    <option value="">Select City</option>
                                    <option value="Ahmedabad">Ahmedabad</option>
                                    <option value="Nadiad">Nadiad</option>
                                    <option value="Surat">Surat</option>
                                    <option value="Gandhinagar">Gandhinagar</option>
                                    <option value="Navsari">Navsari</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                <select id="state" name="state" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} value={formData.state} required>
                                    <option value="">Select State</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Nadiad">Nadiad</option>
                                    <option value="Surat">Surat</option>
                                    <option value="Gandhinagar">Gandhinagar</option>
                                    <option value="Navsari">Navsari</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" name="phone" id="phone" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={handleChange} value={formData.phone} required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="To Receive Order Confirmation"
                                onChange={handleChange}
                                value={formData.email}
                                required
                            />
                        </div>
                        <div className="flex justify-between mb-4">
                            <div>Subtotal :</div>
                            <div>₹ {total || 0}</div> 
                        </div>
                        <div className="flex justify-between mb-4">
                            <div>Taxes:</div>
                            <div>Due Upon Delivery</div>
                        </div>
                        <hr />
                        <div className="flex justify-between mb-4 mt-4">
                            <div>Your Pay :</div>
                            <div>₹ {total || 0}</div> 
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg">Place Order</button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 flex flex-col items-end w-[50%]">
                    {/* <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
                    
                        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold text-lg">Place Order</button>
                    </div> */}
                </div>
            </div>
        </>
    );
}
