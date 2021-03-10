import { Col, Row, Typography } from 'antd'
import React from 'react'
import ItemMediaTimeLine from '../ItemMedia'
import "./styles.scss"
interface Props {
    data: any;
}
const { Title } = Typography

const ListMediaByDate = (props: Props) => {
    const { data } = props
    return (
        <div className={"listMediaByDate"}>
            <div className="d-flex"><Title className="date" level={5}>{data?.date} </Title> <span className={"ml-4 lengthVideo"}>{data?.listMedia?.length || 0} Videos</span></div>
            <Row gutter={[30, 30]}>
                {
                    data?.listMedia?.map((item, index) => {
                        return <Col span={12} md={8} lg={6} xl={4} key={index}> <ItemMediaTimeLine data={item} /></Col>
                    })
                }
            </Row>
        </div >
    )
}

export default ListMediaByDate
