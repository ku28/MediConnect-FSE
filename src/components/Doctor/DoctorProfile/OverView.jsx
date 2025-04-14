import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBriefcase } from "react-icons/fa";

const OverView = ({data}) => {
    if (!data) return null;
    return (
        <div className="col-md-12 col-lg-9">
            <div className='mb-3'>
                <h5 className='overview-text'>About Me</h5>
                <p className='text-secondary'>{data?.biography}</p>
            </div>
            <div>
                <h5 className='overview-text'>Services</h5>
                <p className='text-secondary'>{data?.services}</p>
            </div>
            <div>
                <h5 className='overview-text'>Specializations</h5>
                <p className='text-secondary'>{data?.specialization}</p>
            </div>
            <div>
                <h5 className='overview-text'>Education</h5>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date={data?.completionYear}
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">{data?.college}</h5>
                        <h6 className="text-white">India</h6>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
            <div className='my-5'>
                <h5 className='overview-text'>Work & Experience</h5>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date={data?.year}
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">{data?.experience}</h5>
                        <h6 className="text-white">{data?.designation}</h6>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date={`${data?.expericenceStart} - ${data?.expericenceEnd}`}
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">{data?.experienceHospitalName}</h5>
                        <h6 className="text-white">India</h6>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
            <div>
                <h5 className='overview-text'>Awards</h5>
                <VerticalTimeline>
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: '#50C878', color: '#000' }}
                        contentArrowStyle={{ borderRight: '7px solid  #50C878' }}
                        date={data?.awardYear}
                        iconStyle={{ background: '#50C878', color: '#fff' }}
                        icon={<FaBriefcase />}
                    >
                        <h5 className="text-white">{data?.award}</h5>
                        <h6 className="text-white">India</h6>
                        <p style={{ fontSize: '14px' }}></p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
            </div>
        </div>
    )
}
export default OverView;