import React from 'react';
import TextInput from '../../components/TextInput';
import Layout from '../../components/Layout';
import ProjectsList from '../../components/ProjectsList';
import {
  withRouter
} from 'react-router-dom';

const Dashboard = (props) => {
  // const projectList = props.projects ? Object.keys(props.projects).map( index => {
  //   const project = props.projects[index];

  //   return (
  //     <Link
  //       key={project.id}
  //       to={{ 
  //         pathname: '/project',
  //         params: {
  //           title: project.title,
  //           data: project
  //         }
  //       }}>
  //       <Button 
  //         type={'project'}
  //         text={project.title}
  //         size={'wide'} />
  //     </Link>
  //   );
  // }) : null;

  const openProject = projId => {
    // indexedDB starts at 1, so to get the project by index I take id - 1
    let project = props.projects[projId - 1];

    props.history.push({
      pathname: '/project',
      state: {
        params: {
          data: project
        }
      }
    });
  };

  return (
    <Layout
      topComponents={{
        left: <TextInput
          text={'Create new project'}
          type={'action'}
          size={'regular'} />,
        right: <TextInput
          text={'Search project'}
          type={'search'}
          size={'regular'}/>
      }}
      columnsData={[
        <div>
          <h5>Jump back in</h5>
          <h6>Recent projects</h6>
          { props.projects ? <ProjectsList 
            projects={props.projects} 
            clicked={(projId) => openProject(projId)} /> : null }
        </div>,
        <div>
          <h5>Top URLS</h5>
          <h6>Recent projects</h6>
          { props.projects ? <ProjectsList 
            projects={props.projects} 
            clicked={(projId) => openProject(projId)} /> : null }
        </div>,
        <div>
          <h5>Inspect</h5>
          <h6>Recent projects</h6>
          { props.projects ? <ProjectsList 
            projects={props.projects} 
            clicked={(projId) => openProject(projId)} /> : null }
        </div>
      ]} />
  );
};

export default withRouter(Dashboard);