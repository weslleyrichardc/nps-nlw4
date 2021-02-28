import { AppError } from './../errors/appError';
import { getCustomRepository } from 'typeorm';
import { Request, Response } from "express";

import { SurveyUserRepository } from '../repositories/SurveyUserRepository'

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveyUserRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if (!surveyUser) throw new AppError("Survey User does not exists!");

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }
}

export { AnswerController };