import React, { useState } from 'react';
import './summarywidget.css';


function SummaryWidget(props) {

  const { description, id } = props.data;
  const [readMore, setReadMore] = useState(false);
  const text = description?.en || "";
  const sanitizedDescription = text.replace(/<[^>]+>/g, '');


  const linkName = readMore ? 'read less' : 'read more... '

  return (
    <section className='coin-history-desc p-4'>
      <div className="contents">
        <h2> What is {id} ?</h2>
        {readMore ? sanitizedDescription : sanitizedDescription.substring(0,255)}
        <span  onClick={() => { setReadMore(!readMore) }}>{linkName}</span>
      </div>
    </section>
  )

}

export default SummaryWidget;