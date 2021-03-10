import React from "react";
import {Col, DatePicker, Row, TimePicker, Checkbox, Button, Form} from "antd";
import "./style.scss";
import moment from 'moment';

const ScheduleEdit = props => {
    const [form] = Form.useForm();

    const onChangePicker = (date, dateString) => {
        console.log(date, dateString);
    };

    const onChangeTime = (date, dateString) => {
        console.log(date, dateString);
    };

    const onChangeStartDate = (date, dateString) => {
        console.log(date, dateString);
    };

    const onChangeEndDate = (date, dateString) => {
        console.log(date, dateString);
    };

    const onChangeWeek = (checkedValues) => {
        console.log(checkedValues);
    };

    const arrWeek = [{value: "Mon", name: "Monday"}, {value: "Tue", name: "Tuesday"}, {value: "Wed", name: "Wednesday"},
        {value: "Thu", name: "Thursday"}, {value: "Fri", name: "Friday"}, {value: "Sat", name: "Saturday"},
        {value: "Sun", name: "Sunday"}];

    return (
        <>
            <div className="edit-schedule">

                <h4>Setting</h4>
                <Form form={form}>
                    <label className="text-white">Timeframe</label>
                    <Form.Item label="Active Date">
                        <div className="picker-date"><DatePicker onChange={onChangePicker}/></div>
                    </Form.Item>

                    <div className="picker-time d-flex">
                        <Form.Item label="Start Time">
                            <div className="picker-time-start">
                                <TimePicker onChange={onChangeTime} defaultValue={moment('00:00:00', 'HH:mm:ss')}/>
                            </div>
                        </Form.Item>
                        <div className="ml-5"/>
                        <Form.Item label="End Time">
                            <div className="picker-time-end">
                                <TimePicker onChange={onChangeTime} defaultValue={moment('00:00:00', 'HH:mm:ss')}/>
                            </div>
                        </Form.Item>
                    </div>


                    <div className="picker-time d-flex">
                        <Form.Item label="Start Date">
                            <div className="picker-time-start">
                                <DatePicker onChange={onChangeStartDate}/>
                            </div>
                        </Form.Item>
                        <div className="ml-5"/>
                        <Form.Item label="End Date">
                            <div className="picker-time-end">
                                <DatePicker onChange={onChangeEndDate}/>
                            </div>
                        </Form.Item>
                    </div>

                    <div className="mt-5"/>
                    <label className="text-white">Activation</label>
                    <div className="mb-3"/>
                    <Form.Item label="Everyday">
                        <Checkbox value="loop" className="ml-3 circle-checkbox"/>
                    </Form.Item>
                    <Form.Item label="Particular day only">
                        <Checkbox value="today" className="ml-3 circle-checkbox"/>
                    </Form.Item>
                    <Form.Item>
                        <Checkbox.Group style={{width: '100%'}} onChange={onChangeWeek}>
                            <Row>
                                {
                                    arrWeek.map((item, index) => {
                                        return <Col span={3} key={index}>
                                            {item.name} <Checkbox value={item.value}/>
                                        </Col>
                                    })
                                }
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className="d-flex justify-content-end">
                            <Button className="mr-5" htmlType="submit"> Save</Button>
                            <Button className="ml-4"> Cancel</Button>
                        </div>
                    </Form.Item>

                </Form>

            </div>

        </>
    )
};

export default ScheduleEdit;