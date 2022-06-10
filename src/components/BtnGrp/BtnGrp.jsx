import { Radio } from 'antd';
import React from 'react';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';

function BtnGrp({view, onViewChange}) {
  return (
    <Radio.Group
      value={view}
      onChange={()=>onViewChange(view)}
      buttonStyle="outline"
    >
      <Radio.Button value="table" type="text">
        <UnorderedListOutlined />
      </Radio.Button>
      <Radio.Button value="card" type="text">
        <AppstoreOutlined />
      </Radio.Button>
    </Radio.Group>
  );
}

export default React.memo(BtnGrp)
