import { Request, Response } from 'express'
import pool from '../db/index'

const SDG_TARGETS: Record<number, { goal: string, title: string, targets: string[] }> = {
    1: {
        goal: 'No Poverty',
        title: 'End poverty in all its forms everywhere',
        targets: [
            '1.1 By 2030 eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day',
            '1.2 By 2030 reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions',
            '1.3 Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage',
            '1.4 By 2030 ensure that all men and women have equal rights to economic resources, as well as access to basic services',
            '1.5 By 2030 build the resilience of the poor and those in vulnerable situations and reduce their exposure to climate-related extreme events'
        ]
    },
    2: {
        goal: 'Zero Hunger',
        title: 'End hunger, achieve food security and improved nutrition and promote sustainable agriculture',
        targets: [
            '2.1 By 2030 end hunger and ensure access by all people to safe, nutritious and sufficient food all year round',
            '2.2 By 2030 end all forms of malnutrition including achieving targets on stunting and wasting in children under 5',
            '2.3 By 2030 double the agricultural productivity and incomes of small-scale food producers',
            '2.4 By 2030 ensure sustainable food production systems and implement resilient agricultural practices',
            '2.5 By 2020 maintain the genetic diversity of seeds, cultivated plants and farmed and domesticated animals'
        ]
    },
    3: {
        goal: 'Good Health and Well-being',
        title: 'Ensure healthy lives and promote well-being for all at all ages',
        targets: [
            '3.1 By 2030 reduce the global maternal mortality ratio to less than 70 per 100,000 live births',
            '3.2 By 2030 end preventable deaths of newborns and children under 5 years of age',
            '3.3 By 2030 end the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases',
            '3.4 By 2030 reduce by one third premature mortality from non-communicable diseases through prevention and treatment',
            '3.5 Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol'
        ]
    },
    4: {
        goal: 'Quality Education',
        title: 'Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all',
        targets: [
            '4.1 By 2030 ensure that all girls and boys complete free, equitable and quality primary and secondary education',
            '4.2 By 2030 ensure that all girls and boys have access to quality early childhood development and pre-primary education',
            '4.3 By 2030 ensure equal access for all women and men to affordable and quality technical and tertiary education',
            '4.4 By 2030 substantially increase the number of youth and adults who have relevant skills for employment',
            '4.5 By 2030 eliminate gender disparities in education and ensure equal access to all levels of education'
        ]
    },
    5: {
        goal: 'Gender Equality',
        title: 'Achieve gender equality and empower all women and girls',
        targets: [
            '5.1 End all forms of discrimination against all women and girls everywhere',
            '5.2 Eliminate all forms of violence against all women and girls in the public and private spheres',
            '5.3 Eliminate all harmful practices such as child, early and forced marriage and female genital mutilation',
            '5.4 Recognize and value unpaid care and domestic work through the provision of public services and social protection policies',
            '5.5 Ensure women\'s full and effective participation and equal opportunities for leadership at all levels'
        ]
    },
    6: {
        goal: 'Clean Water and Sanitation',
        title: 'Ensure availability and sustainable management of water and sanitation for all',
        targets: [
            '6.1 By 2030 achieve universal and equitable access to safe and affordable drinking water for all',
            '6.2 By 2030 achieve access to adequate and equitable sanitation and hygiene for all',
            '6.3 By 2030 improve water quality by reducing pollution and minimizing release of hazardous chemicals',
            '6.4 By 2030 substantially increase water-use efficiency across all sectors',
            '6.5 By 2030 implement integrated water resources management at all levels'
        ]
    },
    7: {
        goal: 'Affordable and Clean Energy',
        title: 'Ensure access to affordable, reliable, sustainable and modern energy for all',
        targets: [
            '7.1 By 2030 ensure universal access to affordable, reliable and modern energy services',
            '7.2 By 2030 increase substantially the share of renewable energy in the global energy mix',
            '7.3 By 2030 double the global rate of improvement in energy efficiency',
            '7.a By 2030 enhance international cooperation to facilitate access to clean energy research and technology',
            '7.b By 2030 expand infrastructure and upgrade technology for supplying modern and sustainable energy services'
        ]
    },
    8: {
        goal: 'Decent Work and Economic Growth',
        title: 'Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all',
        targets: [
            '8.1 Sustain per capita economic growth in accordance with national circumstances',
            '8.2 Achieve higher levels of economic productivity through diversification, technological upgrading and innovation',
            '8.3 Promote development-oriented policies that support productive activities, decent job creation and entrepreneurship',
            '8.4 Improve progressively global resource efficiency in consumption and production',
            '8.5 By 2030 achieve full and productive employment and decent work for all women and men'
        ]
    },
    9: {
        goal: 'Industry, Innovation and Infrastructure',
        title: 'Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation',
        targets: [
            '9.1 Develop quality, reliable, sustainable and resilient infrastructure to support economic development',
            '9.2 Promote inclusive and sustainable industrialization and raise industry\'s share of employment and GDP',
            '9.3 Increase the access of small-scale industrial enterprises to financial services and their integration into value chains',
            '9.4 By 2030 upgrade infrastructure and retrofit industries to make them sustainable with increased resource-use efficiency',
            '9.5 Enhance scientific research and upgrade the technological capabilities of industrial sectors'
        ]
    },
    10: {
        goal: 'Reduced Inequalities',
        title: 'Reduce inequality within and among countries',
        targets: [
            '10.1 By 2030 progressively achieve and sustain income growth of the bottom 40 per cent of the population',
            '10.2 By 2030 empower and promote the social, economic and political inclusion of all irrespective of age, sex or disability',
            '10.3 Ensure equal opportunity and reduce inequalities of outcome by eliminating discriminatory laws and practices',
            '10.4 Adopt policies especially fiscal, wage and social protection policies to progressively achieve greater equality',
            '10.5 Improve the regulation and monitoring of global financial markets and institutions'
        ]
    },
    11: {
        goal: 'Sustainable Cities and Communities',
        title: 'Make cities and human settlements inclusive, safe, resilient and sustainable',
        targets: [
            '11.1 By 2030 ensure access for all to adequate, safe and affordable housing and basic services',
            '11.2 By 2030 provide access to safe, affordable, accessible and sustainable transport systems for all',
            '11.3 By 2030 enhance inclusive and sustainable urbanization and capacity for participatory human settlement planning',
            '11.4 Strengthen efforts to protect and safeguard the world\'s cultural and natural heritage',
            '11.5 By 2030 significantly reduce the number of deaths and people affected by disasters'
        ]
    },
    12: {
        goal: 'Responsible Consumption and Production',
        title: 'Ensure sustainable consumption and production patterns',
        targets: [
            '12.1 Implement the 10-Year Framework of Programmes on Sustainable Consumption and Production Patterns',
            '12.2 By 2030 achieve the sustainable management and efficient use of natural resources',
            '12.3 By 2030 halve per capita global food waste at the retail and consumer levels',
            '12.4 By 2020 achieve the environmentally sound management of chemicals and all wastes throughout their life cycle',
            '12.5 By 2030 substantially reduce waste generation through prevention, reduction, recycling and reuse'
        ]
    },
    13: {
        goal: 'Climate Action',
        title: 'Take urgent action to combat climate change and its impacts',
        targets: [
            '13.1 Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters',
            '13.2 Integrate climate change measures into national policies, strategies and planning',
            '13.3 Improve education, awareness-raising and human and institutional capacity on climate change mitigation',
            '13.a Implement the commitment to mobilize jointly $100 billion annually to address the needs of developing countries',
            '13.b Promote mechanisms for raising capacity for effective climate change-related planning and management'
        ]
    },
    14: {
        goal: 'Life Below Water',
        title: 'Conserve and sustainably use the oceans, seas and marine resources for sustainable development',
        targets: [
            '14.1 By 2025 prevent and significantly reduce marine pollution of all kinds',
            '14.2 By 2020 sustainably manage and protect marine and coastal ecosystems',
            '14.3 Minimize and address the impacts of ocean acidification',
            '14.4 By 2020 effectively regulate harvesting and end overfishing',
            '14.5 By 2020 conserve at least 10 per cent of coastal and marine areas'
        ]
    },
    15: {
        goal: 'Life on Land',
        title: 'Protect, restore and promote sustainable use of terrestrial ecosystems',
        targets: [
            '15.1 By 2020 ensure the conservation, restoration and sustainable use of terrestrial and inland freshwater ecosystems',
            '15.2 By 2020 promote the implementation of sustainable management of all types of forests',
            '15.3 By 2030 combat desertification, restore degraded land and soil',
            '15.4 By 2030 ensure the conservation of mountain ecosystems including their biodiversity',
            '15.5 Take urgent and significant action to reduce the degradation of natural habitats and halt the loss of biodiversity'
        ]
    },
    16: {
        goal: 'Peace, Justice and Strong Institutions',
        title: 'Promote peaceful and inclusive societies for sustainable development',
        targets: [
            '16.1 Significantly reduce all forms of violence and related death rates everywhere',
            '16.2 End abuse, exploitation, trafficking and all forms of violence against and torture of children',
            '16.3 Promote the rule of law at the national and international levels and ensure equal access to justice for all',
            '16.4 By 2030 significantly reduce illicit financial and arms flows and combat all forms of organized crime',
            '16.5 Substantially reduce corruption and bribery in all their forms'
        ]
    },
    17: {
        goal: 'Partnerships for the Goals',
        title: 'Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development',
        targets: [
            '17.1 Strengthen domestic resource mobilization to improve domestic capacity for tax and other revenue collection',
            '17.2 Developed countries to implement fully their official development assistance commitments',
            '17.3 Mobilize additional financial resources for developing countries from multiple sources',
            '17.4 Assist developing countries in attaining long-term debt sustainability',
            '17.5 Adopt and implement investment promotion regimes for least developed countries'
        ]
    }
}

export const getSDGTargets = async (req: Request, res: Response): Promise<void> => {
    const evaluationId = parseInt(req.params.id as string)

    // 1. Get the SDGs for this evaluation
    const result = await pool.query(
        'SELECT * FROM sdg_mappings WHERE evaluation_id = $1 ORDER BY sdg_number',
        [evaluationId]
    )

    if (result.rows.length === 0) {
        res.status(404).json({ message: 'No SDGs found for this evaluation. Run the SDG mapping first.' })
        return
    }

    // 2. For each SDG look up the targets
    const sdgsWithTargets = result.rows.map((sdg: any) => {
        const data = SDG_TARGETS[sdg.sdg_number]
        return {
            sdg_number: sdg.sdg_number,
            sdg_title: sdg.sdg_title,
            source: sdg.source,
            goal: data?.goal || '',
            fullTitle: data?.title || '',
            targets: data?.targets || []
        }
    })

    res.status(200).json(sdgsWithTargets)
}