import { Col, message, Row, Spin, List } from 'antd'

import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller';

import FilterListMedia from './components/Filter'
import ListMediaByDate from './components/ListMediaByDate'

import "./styles.scss"
interface Props {

}

const TemplateData = [
    {
        date: "23/12/2019",
        listMedia: [
            {
                id: 1,
                source: require("@assets/images/mediaLibrary/1.png"),
                type: "image",
                name: "mediaLibrary_1",
                descript: ""
            },
            {
                id: 2,
                source: require("@assets/images/mediaLibrary/2.png"),
                type: "image",
                name: "mediaLibrary_2",
                descript: ""
            },
            {
                id: 3,
                source: require("@assets/images/mediaLibrary/3.png"),
                type: "image",
                name: "mediaLibrary_3",
                descript: ""
            },
            {
                id: 4,
                source: require("@assets/images/mediaLibrary/4.png"),
                type: "image",
                name: "mediaLibrary_4",
                descript: ""
            },
            {
                id: 5,
                source: require("@assets/images/mediaLibrary/5.png"),
                type: "image",
                name: "mediaLibrary_5",
                descript: ""
            },
            {
                id: 6,
                source: require("@assets/images/mediaLibrary/6.png"),
                type: "image",
                name: "mediaLibrary_6",
                descript: ""
            },
            {
                id: 7,
                source: require("@assets/images/mediaLibrary/7.png"),
                type: "image",
                name: "mediaLibrary_7",
                descript: ""
            },
        ]
    },
    {
        date: "24/12/2019",
        listMedia: [
            {
                id: 1,
                source: require("@assets/images/mediaLibrary/1.png"),
                type: "image",
                name: "mediaLibrary_1",
                descript: "Admin2112233"
            },
            {
                id: 2,
                source: require("@assets/images/mediaLibrary/2.png"),
                type: "image",
                name: "mediaLibrary_2",
                descript: "Admin2112233"
            },
            {
                id: 3,
                source: require("@assets/images/mediaLibrary/3.png"),
                type: "image",
                name: "mediaLibrary_3",
                descript: "Admin2112233"
            },
            {
                id: 4,
                source: require("@assets/images/mediaLibrary/4.png"),
                type: "image",
                name: "mediaLibrary_4",
                descript: "Admin2112233"
            },
            {
                id: 5,
                source: require("@assets/images/mediaLibrary/5.png"),
                type: "image",
                name: "mediaLibrary_5",
                descript: "Admin2112233"
            },
            {
                id: 6,
                source: require("@assets/images/mediaLibrary/6.png"),
                type: "image",
                name: "mediaLibrary_6",
                descript: "Admin2112233"
            },
            {
                id: 7,
                source: require("@assets/images/mediaLibrary/7.png"),
                type: "image",
                name: "mediaLibrary_7",
                descript: "Admin2112233"
            },
            {
                id: 8,
                source: require("@assets/images/mediaLibrary/1.png"),
                type: "image",
                name: "mediaLibrary_8",
                descript: "Admin2112233"
            },
            {
                id: 9,
                source: require("@assets/images/mediaLibrary/2.png"),
                type: "image",
                name: "mediaLibrary_9",
                descript: "Admin2112233"
            },
            {
                id: 10,
                source: require("@assets/images/mediaLibrary/3.png"),
                type: "image",
                name: "mediaLibrary_10",
                descript: "Admin2112233"
            },
            {
                id: 11,
                source: require("@assets/images/mediaLibrary/4.png"),
                type: "image",
                name: "mediaLibrary_11",
                descript: "Admin2112233"
            },
            {
                id: 12,
                source: require("@assets/images/mediaLibrary/5.png"),
                type: "image",
                name: "mediaLibrary_12",
                descript: "Admin2112233Admin2112233"
            },
            {
                id: 13,
                source: require("@assets/images/mediaLibrary/6.png"),
                type: "image",
                name: "mediaLibrary_13",
                descript: "Admin2112233"
            },
            {
                id: 14,
                source: require("@assets/images/mediaLibrary/7.png"),
                type: "image",
                name: "mediaLibrary_14",
                descript: "Admin2112233"
            },
        ]
    },
]

const request = {
    limit: 14,
    totalRecord: 100
}
export const TimeLineListMedia = (props: Props) => {
    const [state, setState] = useState({
        data: [],
        loading: false,
        hasMore: true,
    });
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
        setState(prev => ({ ...prev, data: state.data.concat(TemplateData), loading: false, }))
    };
    const handleInfiniteOnLoad = () => {

        let { data } = state;
        setState(prev => ({ ...prev, loading: true }))
        const lengthWithChild = data.reduce((total, item) => { return total += item.listMedia.length }, 0);

        if (lengthWithChild > request.totalRecord) {
            message.warning('Infinite List loaded all');
            setState(prev => ({
                ...prev,
                hasMore: false,
                loading: false,
            }));
            return;
        }
        fetchData()
    }

    return (

        <Col span={24}>
            <Row>
                <Col span={24}> <FilterListMedia /></Col>
            </Row>
            <Row gutter={[15, 15]}>
                <Col span={24} className="wrapContentListMedia">

                    <InfiniteScroll
                        initialLoad={false}
                        pageStart={0}
                        loadMore={handleInfiniteOnLoad}
                        hasMore={!state.loading && state.hasMore}
                        useWindow={false}
                    >
                        <List
                            dataSource={state.data}
                            renderItem={
                                (item, index) => <Col span={24} className="pb-5" key={index}><ListMediaByDate data={item} /></Col>
                            }
                        >

                            {state.loading && state.hasMore && (
                                <div className="demo-loading-container">
                                    <Spin />
                                </div>
                            )}
                        </List>
                    </InfiniteScroll>
                </Col>
            </Row>
        </Col>

    )
}
