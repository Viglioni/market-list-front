import React, {useEffect, useState, useCallback} from 'react'
import {map} from 'ramda'
import {Tabs, Button} from 'antd'
import {PlusSquareOutlined} from '@ant-design/icons'
import api from '../service'
import ListContent from './list-content'


const {TabPane} = Tabs

const Lists = () => {
    const [lists, setLists] = useState([])
    const [activeTab, setActiveTab] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const getLists = useCallback(async ()=>{
        setLoading(true)
        const {data} = await api.get('lists')
        setLists(map(list => list.name, data))
        setActiveTab(data[0].name)
        setTimeout(() => setLoading(false), 500)
    },[setLists, setActiveTab])

    useEffect(()=> {getLists()}, [])

    const listsTabs = map(
        list => (<TabPane tab={list} key={list}> <ListContent list={activeTab}/> </TabPane>),
        lists)

    

    return  (
        <Tabs activeTab={activeTab} onChange={setActiveTab} tabBarExtraContent={
            <PlusSquareOutlined onClick={console.log}/> }>   
          {listsTabs}
        </Tabs>
    ) 
}

export default Lists
