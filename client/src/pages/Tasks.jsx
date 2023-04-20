import React, { useEffect, useState } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, 
  ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Toolbar } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

const Tasks = () => {
  const [tasks, setTasks] = useState({})

  useEffect(() => {
    fetch('http://127.0.0.1:5555/tasks')
    .then(res=>res.json())
    .then(data=>setTasks(data))
  }, [])

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category = "Page" title="Tasks" />
      <GridComponent
        id="gridcomp"
        dataSource={tasks}
        allowPaging
        allowSorting
        toolbar={['Search']}
      
      >
        <ColumnsDirective>
        {ordersGrid.map((item, index) => (
          <ColumnDirective key={index} {...item}/>
        ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]}/>
      </GridComponent>
    </div>
  )
}

export default Tasks