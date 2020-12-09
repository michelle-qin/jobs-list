import React, { useState, Component } from 'react';
import { Button } from "reactstrap";
import { useQuery } from '@apollo/react-hooks';
import { gql } from '@apollo/client';

const LIST = gql`{
    cities {
        name
        jobs {
          title
          applyUrl
          description
          company {
            name
          }
        }
    }
}`;

const RenderJobs = (props) => {
    const [coName, toggle_co] = useState(props);
    const [titleName, toggle_title] = useState(props);
    const [cityName, toggle_city] = useState(props);

    const { loading, error, data } = useQuery(LIST);
    
    if (loading) return <p style={{fontFamily:'Custom', textAlign:"center"}}>Loading, please wait a moment.</p>;
    if (error) return <p style={{fontFamily:'Custom', textAlign:"center"}}>There was an error. Try again.</p>;
    return (
        data.cities.map((city, id) =>
            <div>
            <h2 key={id} style={{fontFamily:'Custom', fontWeight:'bolder', marginLeft:"15px", color:"blue"}}> <u>{city.name}</u></h2>
                {data.cities[id].jobs.map((job, id) => {
                    return(
                        <>
                        <h3 key={id} style={{fontFamily:'Custom', marginLeft:"45px"}}>{job.company.name} — <i>{job.title}</i> </h3>
                        <Button 
                            style={{fontFamily:'Custom', position: "absolute", left:"45px", cursor:"pointer"}}
                            onClick={() => { toggle_co(job.company.name); toggle_title(job.title); toggle_city(city.name)}}
                        > Click to Show Description </Button>
                        <br></br>
                        <div style={{fontFamily:'Custom',  left:"45px", marginTop: "2px"}}>
                            {coName === job.company.name && titleName === job.title && cityName === city.name && job.description}
                        </div>
                        <br></br>
                        <a href={job.applyUrl} target="_blank" style={{fontFamily:'Custom', marginLeft:"45px"}}>Click here to apply.</a>
                        </>
                        )
                }
            )}
            </div>
    ))
}

export default class ShowJobs extends Component {
    constructor(props) {
        super(props);
        this.toggle_co = this.toggle_co.bind(this);
        this.toggle_title = this.toggle_title.bind(this);
        this.toggle_city = this.toggle_city.bind(this);
        this.state = {
            co_Name: null,
            title_Name: null,
            city_Name: null,
        }
    }

    toggle_co(coName) {
        this.setState({
            co_Name: coName,
        });
    }
    toggle_title(titleName) {
        this.setState({
            title_Name: titleName,
        });
    }
    toggle_city(cityName) {
        this.setState({
            city_Name: cityName,
        });
    }

    render() {
        return(
            <div>
                <RenderJobs />
            </div>
         )
    }
}


