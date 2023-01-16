import React from 'react';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const handleSubmit = () => {
        Swal.fire(
            'Thanks for your submission!',
            'We will reactout to you soon!',
            'success'
          )
    }

    return (
        <div className='container mx-auto p-6'>
            <div className="mt-14 mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 justify-around items-center">
                        <div className="text-center lg:text-left">
                        <h1 className="text-3xl lg:text-4xl font-bold ">Let's Get In Touch</h1>
                        <div className='mt-3'>
                            <p>Mobile: +8801835025527</p>
                            <p>Email: pervezhossain1998@gmail.com</p>
                        </div>
                  
                        </div>
                    <div className="card lg:w-[450px] flex-shrink-0 shadow-2xl bg-base-100 mt-10">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="Enter Name" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Enter Email" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Phone</span>
                            </label>
                            <input type="phone" placeholder="Enter Phone Number" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Message</span>
                            </label>
                          <textarea className='input input-bordered' name="" id="" cols="" rows="2"></textarea>
                        </div>
                        <button type="submit" className='btn btn-primary mt-4' onClick={handleSubmit}>Submit</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;