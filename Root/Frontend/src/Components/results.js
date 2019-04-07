import React, { Component } from 'react';
import C from './card';

class results extends Component {

  render() {
    return (
        this.props.results.map(p=>{
            return(
                <div> <C content={p.description} title={p.name} image={null}  />
                </div>
            )}) 

 )
}} 

export default results ;
