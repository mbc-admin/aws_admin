import {Routes, Route} from 'react-router-dom';

import Messages from '../views/messages/messages';
import Chat from '../views/chat/chat';
import Rating from '../views/rating/rating';
import ReportUser from '../views/reportUser/reportUser';
import History from '../views/history/history';
import Articles from '../views/articles/articles';
import Article from '../views/article/article';
import Profile from '../views/profile/profile';
import Users from '../views/users/users';

import React from 'react';

import NotFound from '../views/notFound/notFound';
import Coaches from '../views/coaches/coaches';
import Company from '../views/company/company';
import Specialties from '../views/specialties/specialties';
import Schedules from  '../views/schedules/schedules';
import EditSpecialty from '../views/specialties/editSpecialty/editSpecialty';
import AddUser from '../views/users/addUser/addUser';
import AddCoach from '../views/coaches/addCoach/addCoach';
import AddCompany from '../views/company/addCompany/addCompany';
import AddSpecialty from '../views/specialties/addSpecialty/addSpecialty';

import EditCoach from '../views/coaches/editCoach/editCoach';
import EditCompany from '../views/company/editCompany/editCompany';
import EditUser from '../views/users/editUser/editUser';
import ChatHistory from '../views/chatHistory/chatHistory';
import Calendar from '../views/calendar/calendar';
import GeneralStats from '../views/generalStats/generalStats';
import CoachStats from '../views/coachStats/coachStats';
import CompaniesStats from '../views/companiesStats/companiesStats';
import AddSection from '../views/articles/addSection/addSection';
import AddArticle from '../views/articles/addArticle/addArticle';


const Router = () => {

    return(
        <Routes>
            <Route path={'/'} element={<Coaches/>}/>
            <Route path={'/chat'} element={<Chat/>}/>
            <Route path={'/rating'} element={<Rating/>}/>
            <Route path={'/report'} element={<ReportUser/>}/>
            <Route path={'/messages'} element={<Messages/>}/>
            <Route path={'/articles'} element={<Articles/>}/>
            <Route path={'/article'} element={<Article/>}/>
            <Route path={'/profile'} element={<Profile/>}/>
            <Route path={'/users'} element={<Users/>}/>
            <Route path={'/coaches'} element={<Coaches/>}/>
            <Route path={'/companies'} element={<Company/>}/>
            <Route path={'/specialties'} element={<Specialties/>}/>
            <Route path={'/schedules'} element={<Schedules/>}/>
            <Route path={'/addUser'} element={<AddUser/>}/>
            <Route path={'/addCoach'} element={<AddCoach/>}/>
            <Route path={'/addCompany'} element={<AddCompany/>}/>
            <Route path={'/addSpecialty'} element={<AddSpecialty/>}/>
            <Route path={'/editSpecialty'} element={<EditSpecialty/>}/>
            <Route path={'/editCoach'} element={<EditCoach/>}/>
            <Route path={'/addSection'} element={<AddSection/>}/>
            <Route path={'/addArticle'} element={<AddArticle/>}/>
            <Route path={'/editCompany'} element={<EditCompany/>}/>
            <Route path={'/editUser'} element={<EditUser/>}/>
            <Route path={'/chatHistory'} element={<ChatHistory/>}/>
            <Route path={'/calendar'} element={<Calendar/>}/>
            <Route path={'/generalStats'} element={<GeneralStats/>}/>
            <Route path={'/coachStats'} element={<CoachStats/>}/>
            <Route path={'/companiesStats'} element={<CompaniesStats/>}/>


            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    )
}

export default Router;
