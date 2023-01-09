import React from 'react'

import CardStage from './CardStage/CardStage.js';
import Controls from './Controls/Controls.js';

const Main = () => {
  return (
    <main className='main'>
        <Controls />
        <CardStage />
    </main>
  )
}

export default Main