import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import QuestionList from '../../src/components/QuestionList';
import {expect} from 'chai';
import {List} from 'immutable';

describe('QuestionList', () => {

  it('renders question links', () => {
    const component = renderIntoDocument(
      <QuestionList questions={ [ { title : 'question1'}, { title : 'question2'} ]} />
    )
    const links = scryRenderedDOMComponentsWithTag(component, 'a');

    expect(links[0].textContent).to.equal('question1')
    expect(links[1].textContent).to.equal('question2')
  });


/*
  it('invokes callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]}
              vote={vote}/>
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    Simulate.click(buttons[0]);

    expect(votedWith).to.equal('Trainspotting');
  });
*/
})
