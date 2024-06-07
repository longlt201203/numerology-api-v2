import { AnalyzeRequestDto, CalculateNumerologyDto, CalculateNumerologyResultDto, CalculateYearRequestDto, CompareRequestDto } from "./dto";
import { OpenAIService } from "@modules/openai";
import { Injectable } from "@nestjs/common";

@Injectable()
export class NumerologyService {
    private static NUMEROLOGY_READING_SYSTEM_MESSAGE = "You are a Pythagorean Numerology expert. You will be provided with a person's calculated numerology map and the necessary language (the data is in JSON format). Please provide a numerology analysis for that person, following this structure: core numbers, challenges and solutions, additional numbers, and conclusion. The result must be in the provided language.";
    private static NUMEROLOGY_COMPARING_SYSTEM_MESSAGE = "You are a Pythagorean Numerology expert. You will be provided with a list of people's calculated numerology maps and the necessary language (the data will be in JSON format). Please provide a comparative numerology analysis of these individuals, evaluating their compatibility and differences, and scoring their relationships (in percentage). The result must be in the provided language.";
    private static NUMEROLOGY_CALCULATE_YEAR_SYSTEM_MESSAGE = "You are a Pythagorean Numerology expert. You will be provided with a year number of a person and the necessary language (the data will be in JSON format). Please give the person the numerology analysis for that year number. The result must be in the provided language.";

    constructor(
        private readonly openaiService: OpenAIService
    ) { }

    private readonly charMap = {
        a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1,
        k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2,
        u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
    } as const;
    private readonly vowels = ['a', 'i', 'u', 'e', 'o', 'y'];

    recursionDigitSum(n: number): number {
        let s = Array.from(n.toString(), (item) => parseInt(item));
        const sum = s.reduce((prev, curr) => prev + curr);
        return (sum < 10 || sum == 11 || sum == 22 || sum == 33) ? sum : this.recursionDigitSum(sum);
    }

    calculateLifePathNumber(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth() + 1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());
        const lifePathNumber = this.recursionDigitSum(daySum + monthSum + yearSum);
        return lifePathNumber;
    }

    calculateSoulUrgeNumber(fullName: string) {
        let sum = 0;
        for (const c of fullName) {
            if (this.vowels.includes(c)) {
                sum += this.charMap[c];
            }
        }
        return this.recursionDigitSum(sum);
    }

    calculateExpressionNumber(fullName: string) {
        let sum = 0;
        for (const part of fullName.split(" ")) {
            let tmp = 0;
            for (const c of part) {
                tmp += this.charMap[c];
            }
            sum += this.recursionDigitSum(tmp);
        }

        return this.recursionDigitSum(sum);
    }

    calculatePersonalityNumber(fullName: string) {
        let sum = 0;
        for (const c of fullName) {
            if (!this.vowels.includes(c) && this.charMap[c]) {
                sum += this.charMap[c];
            }
        }
        return this.recursionDigitSum(sum);
    }

    calculateBirthdayNumber(dob: Date) {
        return this.recursionDigitSum(dob.getDate());
    }

    calculateMaturityNumber(lifePathNumber: number, expressionNumber: number) {
        return this.recursionDigitSum(lifePathNumber + expressionNumber);
    }

    calculateBalanceNumber(fullName: string) {
        let sum = 0;
        for (const part of fullName.split(" ")) {
            sum += this.charMap[part.charAt(0)];
        }
        return this.recursionDigitSum(sum);
    }

    calculateChallengeNumbers(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth() + 1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());

        const first = Math.abs(daySum - monthSum);
        const second = Math.abs(daySum - yearSum);
        const third = Math.abs(first - second);
        return [first, second, third];
    }

    calculatePinnacleNumbers(dob: Date) {
        const daySum = this.recursionDigitSum(dob.getDate());
        const monthSum = this.recursionDigitSum(dob.getMonth() + 1);
        const yearSum = this.recursionDigitSum(dob.getFullYear());

        const first = this.recursionDigitSum(daySum + monthSum);
        const second = this.recursionDigitSum(daySum + yearSum);
        const third = this.recursionDigitSum(first + second);
        const fourth = this.recursionDigitSum(monthSum + yearSum);

        return [first, second, third, fourth]
    }

    calculateHiddenPassionNumber(fullName: string) {
        const counter = {};
        let max = 0;
        const hiddenPassionNumbers: number[] = [];
        for (const c of fullName) {
            if (this.charMap[c]) {
                if (counter[this.charMap[c]]) {
                    counter[this.charMap[c]]++;
                } else {
                    counter[this.charMap[c]] = 1;
                }

                if (counter[this.charMap[c]] > max) {
                    max = counter[this.charMap[c]];
                };
            }
        }
        for (const k in counter) {
            if (counter[k] == max) {
                hiddenPassionNumbers.push(parseInt(k));
            }
        }
        return hiddenPassionNumbers;
    }

    calculateCornerstoneNumber(firstName: string) {
        return this.charMap[firstName.charAt(0)];
    }

    calculateCapstoneNumber(firstName: string) {
        return this.charMap[firstName.charAt(firstName.length - 1)];
    }

    calculateFirstVowelNumber(firstName: string) {
        for (const c of firstName) {
            if (this.vowels.includes(c)) {
                return this.charMap[c];
            }
        }
    }

    lowercaseAndNormalizeString(str: string) {
        return str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/Đ/g, 'D')
            .replace(/đ/g, 'd');
    }

    calculate(dto: CalculateNumerologyDto): CalculateNumerologyResultDto {
        const dob = new Date(dto.dob);
        const lsName = this.lowercaseAndNormalizeString(dto.lsName);
        const firstName = this.lowercaseAndNormalizeString(dto.firstName);
        const fullName = [lsName, firstName].join(" ");
        const lifePathNumber = this.calculateLifePathNumber(dob);
        const expressionNumber = this.calculateExpressionNumber(fullName);

        return {
            lifePath: lifePathNumber,
            soulUrge: this.calculateSoulUrgeNumber(fullName),
            expression: expressionNumber,
            personality: this.calculatePersonalityNumber(fullName),
            birthday: this.calculateBirthdayNumber(dob),
            maturity: this.calculateMaturityNumber(lifePathNumber, expressionNumber),
            balance: this.calculateBalanceNumber(fullName),
            challenge: this.calculateChallengeNumbers(dob),
            pinnacle: this.calculatePinnacleNumbers(dob),
            hiddenPassion: this.calculateHiddenPassionNumber(fullName),
            cornerstone: this.calculateCornerstoneNumber(firstName),
            capstone: this.calculateCapstoneNumber(firstName),
            firstVowel: this.calculateFirstVowelNumber(firstName)
        }
    }

    async analyze(dto: AnalyzeRequestDto) {
        const result = this.calculate(dto);
        const res = await this.openaiService.createChatCompletions([
            { role: "system", content: NumerologyService.NUMEROLOGY_READING_SYSTEM_MESSAGE },
            {
                role: "user", content: JSON.stringify({ ...result, lang: dto.lang })
            }
        ]);
        return res.choices[0].message.content;
    }

    async analyzeStream(dto: AnalyzeRequestDto, onStreaming: (chunk: string) => void, onEndStream: () => void) {
        const result = this.calculate(dto);
        const res = await this.openaiService.createChatCompletionsStream([
            { role: "system", content: NumerologyService.NUMEROLOGY_READING_SYSTEM_MESSAGE },
            {
                role: "user", content: JSON.stringify({ ...result, lang: dto.lang })
            }
        ]);
        for await (const chunk of res) {
            if (chunk.choices[0].delta.content) onStreaming(chunk.choices[0].delta.content);
        }
        onEndStream();
    }

    async compareStream(dto: CompareRequestDto, onStreaming: (chunk: string) => void, onEndStream: () => void) {
        const resultMap = { lang: dto.lang };
        dto.list.forEach((p, index) => {
            resultMap[`#${index+1}`] = this.calculate(p);
        });
        const res = await this.openaiService.createChatCompletionsStream([
            { role: "system", content: NumerologyService.NUMEROLOGY_COMPARING_SYSTEM_MESSAGE },
            {
                role: "user", content: JSON.stringify(resultMap)
            }
        ]);
        for await (const chunk of res) {
            if (chunk.choices[0].delta.content) onStreaming(chunk.choices[0].delta.content);
        }
        onEndStream();
    }

    async calculateYearNumberStream(dto: CalculateYearRequestDto, onStreaming: (chunk: string) => void, onEndStream: () => void) {
        const birthday = new Date(dto.dob);
        const d = new Date(dto.year, birthday.getMonth(), birthday.getDate());
        const yearString = dto.year.toString();
        const y = parseInt(yearString.slice(yearString.length-2, yearString.length));
        const yearNumber = this.recursionDigitSum(y+birthday.getDate()+birthday.getMonth()+d.getDay()+2);
        
        const data = { lang: dto.lang, yearNumber: yearNumber };
        const res = await this.openaiService.createChatCompletionsStream([
            { role: "system", content: NumerologyService.NUMEROLOGY_CALCULATE_YEAR_SYSTEM_MESSAGE },
            {
                role: "user", content: JSON.stringify(data)
            }
        ]);
        for await (const chunk of res) {
            if (chunk.choices[0].delta.content) onStreaming(chunk.choices[0].delta.content);
        }
        onEndStream();
    }
}