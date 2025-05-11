/* eslint-disable no-unused-vars */
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import NotFoundPage from './pages/NotFoundPage';
import JobPage, {jobLoader} from './pages/JobPage';
import AddJob from './pages/AddJob';
import EditJob from './pages/EditJob';
const App = () => {
  // Add New Job
  const addJob =async (newJob)=>{
    const res = await fetch('/api/jobs',{
      method:'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(newJob)
    });
    return;
  }
// Delete Job 
  const deleteJob = async (id)=>{
    const res = await fetch(`/api/jobs/${id}`,{
      method:'DELETE',
    });
    return;
  }
  const updateJob =async (updatedJob)=>{
    const res = await fetch(`/api/jobs/${updatedJob.id}`,{
      method:'PUT',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(updatedJob)
    });
    return;
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path='/' element={<MainLayout />}>
      <Route index element={<HomePage />}/>
      <Route path='/jobs' element={<JobsPage />}/>
      <Route path="/add-job" element={<AddJob addJobSubmit={addJob}/>}/>
      <Route path='/jobs/:id' element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
      <Route path='/edit-job/:id' element={<EditJob UpdateJobSubmit={updateJob}/>} loader={jobLoader}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Route>
  )
  );
  return <RouterProvider router={router}/>
};

export default App
