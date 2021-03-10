import React, { useEffect } from 'react'
import { Card, Col, Input, Row, Typography } from 'antd'
import mediaPresenter from "@modules/media/presenter"
import UseMediaApproved from './UseMediaApproved'
import { ItemMedia } from './components/ItemMedia'
import "./styles.scss"
import Loading from '@view/shared/components/Loading'

interface Props {

}
const { Title } = Typography;
const APPROVED_MEDIA = "Approved Media"
const GETTING_DATA = "Getting Data...."
const MediaApproved = (props: Props) => {
    const { state, loading, getListMedia } = UseMediaApproved()

    useEffect(() => {
        getListMedia();
    }, [])
    const handleSearchListMedia = (value) => {
        getListMedia();
    }
    return (
        <Col span="8">
            <div className={"card-media-approved"}>
                <Row className="title-media">
                    <Title level={3}>{APPROVED_MEDIA}</Title>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Row justify="end" gutter={[15, 15]}>
                            <Col span="12">
                                <Input.Search onSearch={handleSearchListMedia} className="input-componet" />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={24} className="content-media">
                        <Row gutter={[16, 16]}>
                            {!loading && <div className="text-center w-100"><Loading /> </div>}
                            {
                                !loading && state?.listMedia?.map((item) => {
                                    return <Col span={24}><ItemMedia data={item} /></Col>
                                })
                            }

                        </Row>
                    </Col>

                </Row>
            </div>
        </Col>
    )
}

export default MediaApproved