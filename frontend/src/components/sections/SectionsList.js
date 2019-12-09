import React,{Component} from 'react';
import Section from './Section';

class SectionsList extends Component {
     constructor(props){
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEditChange = this.handleEditChange.bind(this);
        }
        
    handleDelete(sectionId){
        this.props.onDelete(sectionId);
    }

    handleEditChange(sectionId, e){
        this.props.onEditChange(sectionId, e);
    }

    render(){
        return(
            <div>
                <div className="container">
                    <div className="sections-list">
                        <div className="main-div">
                            <div className="panel">
                                <h4>Sections</h4>
                                {
                                    this.props.sections ? 
                                        this.props.sections.map(section => {
                                            return <Section section = {section}
                                            onDelete = {this.handleDelete}
                                            onEditChange = {this.handleEditChange}/>
                                        })
                                    :
                                    <span/>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        
        )
    }
}

export default SectionsList;