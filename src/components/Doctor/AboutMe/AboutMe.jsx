import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useForm } from 'react-hook-form';
import { Button, Select, message, DatePicker } from 'antd';
import { useUpdateDoctorMutation } from '../../../redux/api/doctorApi';
import useAuthCheck from '../../../redux/hooks/useAuthCheck';
import { doctorSpecialistOptions } from '../../../constant/global';
import { doctorServicesOptions } from '../../../constant/global';
import DashboardLayout from '../DashboardLayout/DashboardLayout';

const AboutMe = () => {
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedSpec, setSelectedSpec] = useState([]);
    const [updateDoctor, { isLoading, isSuccess, isError, error }] = useUpdateDoctorMutation();
    const { data, role } = useAuthCheck();
    const { register, handleSubmit } = useForm({});
    const [userId, setUserId] = useState('');
    const [selectValue, setSelectValue] = useState({});
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (data) {
            const { id, services } = data;
            setUserId(id);
            setSelectedServices(services?.split(','));
        }
    }, [data]);

    useEffect(() => {
        if (data) {
            const { id, specialization } = data;
            setUserId(id);
            setSelectedSpec(specialization?.split(','));
        }
    }, [data]);

    const onSubmit = (formData) => {
        const updatedData = { ...formData, ...selectValue };
        if (date) updatedData.dob = date;
        updatedData.services = Array.isArray(selectedServices) ? selectedServices.join(',') : null;
        updatedData.specialization = Array.isArray(selectedSpec) ? selectedSpec.join(',') : null;
        // Remove empty values
        const cleanedData = Object.fromEntries(Object.entries(updatedData).filter(([_, value]) => value !== ''));

        const formDataObj = new FormData();
        formDataObj.append('data', JSON.stringify(cleanedData));

        updateDoctor({ data: formDataObj, id: userId });
    };

    useEffect(() => {
        if (isError && !isLoading) {
            message.error(error?.data?.message);
        }
        if (isSuccess) {
            message.success('Successfully Updated!');
        }
    }, [isLoading, isError, error, isSuccess]);

    return (
        <DashboardLayout>
            <div style={{ marginBottom: '10rem' }}>
                <div className="w-100 mb-3 rounded mb-5 p-2" style={{ background: '#f8f9fa' }}>
                    <h5 className="text-title mb-2 mt-3 text-center">Tell Us About Yourself</h5>
                    <form className="row form-row" onSubmit={handleSubmit(onSubmit)}>
                        {/* Biography */}
                        <div className="col-md-12">
                            <div className="card mb-2 mt-2">
                                <div className="card-body">
                                    <h6 className="card-title text-secondary">About Me</h6>
                                    <div className="form-group mb-2 card-label">
                                        <label>Biography</label>
                                        <textarea defaultValue={data?.biography} {...register("biography")} className="form-control" rows={5} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="col-md-12">
                            <div className="card mb-2 mt-2 py-2">
                                <div className="form-group mb-2 mx-3 card-label">
                                    <label>Services</label>
                                    <Select
                                        mode="multiple"
                                        options={doctorServicesOptions}
                                        value={selectedServices}
                                        onChange={setSelectedServices}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Specialization */}
                        <div className="col-md-12">
                            <div className="card mb-2 mt-2 py-2">
                                <div className="form-group mb-2 mx-3 card-label">
                                    <label>Specialization</label>
                                    <Select
                                        mode="multiple"
                                        options={doctorSpecialistOptions}
                                        value={selectedSpec}
                                        onChange={setSelectedSpec}
                                        style={{ width: '100%' }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Clinic Info */}
                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h6 className="card-title text-secondary">Clinic Info</h6>
                                <div className="row form-row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Clinic Name</label>
                                            <input defaultValue={data?.clinicName} {...register("clinicName")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Clinic Address</label>
                                            <input defaultValue={data?.clinicAddress} {...register("clinicAddress")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Education Details */}
                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h6 className="card-title text-secondary">Education Details</h6>
                                <div className="row form-row">
                                    <div className="col-md-4">
                                        <div className="form-group mb-2 card-label">
                                            <label>Degree</label>
                                            <input defaultValue={data?.degree} {...register("degree")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-2 card-label">
                                            <label>College Name</label>
                                            <input defaultValue={data?.college} {...register("college")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-2 card-label">
                                            <label>Completion Year</label>
                                            <input defaultValue={data?.completionYear} {...register("completionYear")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Experience */}
                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h6 className="card-title text-secondary">Experience</h6>
                                <div className="row form-row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Experience</label>
                                            <input defaultValue={data?.experience} {...register("experience")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Designation</label>
                                            <input defaultValue={data?.designation} {...register("designation")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Hospital Name</label>
                                            <input defaultValue={data?.experienceHospitalName} {...register("experienceHospitalName")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group mb-2 card-label">
                                            <label>Start</label>
                                            <input defaultValue={data?.expericenceStart} {...register("expericenceStart")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="form-group mb-2 card-label">
                                            <label>End</label>
                                            <input defaultValue={data?.expericenceEnd} {...register("expericenceEnd")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Awards */}
                        <div className="col-md-12">
                            <div className="card mb-2 p-3 mt-2">
                                <h6 className="card-title text-secondary">Awards</h6>
                                <div className="row form-row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Award</label>
                                            <input defaultValue={data?.award} {...register("award")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Award Year</label>
                                            <input defaultValue={data?.awardYear} {...register("awardYear")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Registration</label>
                                            <input defaultValue={data?.registration} {...register("registration")} className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-2 card-label">
                                            <label>Registration Year</label>
                                            <input defaultValue={data?.year} {...register("year")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Changes Button */}
                        <div className="d-flex justify-content-center my-3">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                loading={isLoading}
                                disabled={isLoading ? true : false}
                            >
                                {isLoading ? 'Saving ...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AboutMe;
