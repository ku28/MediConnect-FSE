import React from 'react'
import Footer from '../../Shared/Footer/Footer'
import './index.css';
import { useParams } from 'react-router-dom';
import Header from '../../Shared/Header/Header';
import SubHeader from '../../Shared/SubHeader';
import { useGetDoctorQuery } from '../../../redux/api/doctorApi';
import { Empty, message } from 'antd';
import SearchContent from '../SearchDoctor/SearchContent';
import { Tabs } from 'antd';
import OverView from './OverView';
import Location from './Location';
import Review from './Review';
// import Availibility from './Availibility';

const DoctorProfile = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetDoctorQuery(id);
    let content = null;
    if (!isLoading && isError) content = <div>{message.error('Something went Wrong!')}</div>
    if (!isLoading && !isError && data?.id === undefined) content = <Empty />
    if (!isLoading && !isError && data?.id) content = <SearchContent data={data} />

    const items = [
        {
            key: '1',
            label: 'Overview',
            children: <OverView data={data} />,
        },
        {
            key: '2',
            label: 'Locations',
            children: <Location data={data} />,
        },
        {
            key: '3',
            label: 'Reviews',
            children: <Review doctorId={id}/>,
        },
        // {
        //     key: '4',
        //     label: 'Availability',
        //     children: <Availibility />,
        // },
    ];

    
    return (
        <>
            <Header />
            <SubHeader title='Doctor Details' subtitle='See our doctors' />
            <div className="container">
                <div className="doc-details">
                    {content}
                </div>
                <div className='p-4 rounded content1'>
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default DoctorProfile;