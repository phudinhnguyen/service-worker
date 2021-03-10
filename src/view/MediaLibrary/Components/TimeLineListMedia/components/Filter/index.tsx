import { Checkbox, Input, Row, Col } from 'antd'
import React from 'react'
import "./styles.scss";

interface Props {

}

const FilterListMedia = (props: Props) => {
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
    const options = [
        { label: 'All', value: 'All' },
        { label: 'Image', value: 'Image' },
        { label: 'Video', value: 'Video' },
        { label: 'Audio', value: 'Audio' },
    ]
    return (
        <div>
            <Row justify="space-between" align={"middle"} className="group-checkbox-search">
                <Col > <Checkbox.Group
                    options={options}
                    defaultValue={['Apple']}
                    onChange={onChange}
                /></Col>
                <Col span={10}>
                    <Row justify={"end"} align={"middle"} gutter={[8, 8]}>
                        <Col ><Checkbox className="check-select-all " value={"selectAll"}> Select All</Checkbox> </Col>
                        <Col  >
                            <Input.Search className="ant-form-search" /></Col>
                    </Row>
                </Col>
            </Row>

        </div>
    )
}

export default FilterListMedia
