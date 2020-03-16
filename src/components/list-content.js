import React, {useEffect, useState, useCallback} from 'react'
import {map, zip, range, filter} from 'ramda'
import {Tabs, Table, Button} from 'antd'
import api from '../service'

const {TabPane} = Tabs

const ListContent = ({list}) => {
    const [content, setContent] = useState([])
    const showTable = Boolean(content.length)

    
    const columnMask = filter( key => key !== "key", Object.keys( content[0] || {}))
    const columns = map( title => ({title: title, dataIndex: title, key: title}), columnMask)

    const sortPerUrgencyAndName = useCallback(arr => {
        const newArr = [...arr]
        newArr.sort(
            (a,b) => {
                const values = {high: 2, medium: 1, low: 0}
                if( values[a.urgency] > values[b.urgency]) return -1
                else if ( values[a.urgency] < values[b.urgency]) return 1
                else return a.name > b.name ? 1 : -1})
        return newArr}, [])

    const getItems = useCallback(async ()=>{
        if(list){
            const {data} = await api.get('list', {list})
            setContent(
                sortPerUrgencyAndName(
                    map( ([item, idx]) => ({...item, key: idx}), // add the key 'key' to obj
                         zip(data, range(0, data.length)))))
        }},[setContent, list ])

    useEffect(()=> {getItems()}, [list])


    return (
        <>
          <Button>Add new item</Button>
          <Button> Edit list </Button>
        {showTable
         ? (<Table columns={columns} dataSource={content} pagination={false} />)
         : null}
        </>
    )
}

export default ListContent
