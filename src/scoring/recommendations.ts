// Static recommendations extracted directly from the Excel tool
// Used for GET /evaluations/:id/recommendations

// ============================================================
// STAGE I - ENVIRONMENTAL RECOMMENDATIONS
// Key format: "Topic_MagnitudeLevel"
// ============================================================

export const ENVIRONMENTAL_RECOMMENDATIONS: Record<string, { whatItMeans: string; action: string }> = {
    // WATER
    'Water_Low': {
        whatItMeans: 'Water withdrawal is minimal, within sustainable limits, no stress on local ecosystems.',
        action: 'Minimal withdrawal, no stress on ecosystems.'
    },
    'Water_Moderate': {
        whatItMeans: 'Some localized impact on water bodies, but ecosystems remain stable.',
        action: 'Some localized stress on water bodies.'
    },
    'Water_Significant': {
        whatItMeans: 'Water use contributes to noticeable ecosystem stress (e.g., reduced river flow, aquifer depletion).',
        action: 'Noticeable depletion or affecting ecosystems.'
    },
    'Water_High': {
        whatItMeans: 'Severe over-extraction leading to water scarcity, damaged ecosystems, or conflicts with communities.',
        action: 'Severe overuse, ecosystem collapse risk.'
    },

    // POLLUTION
    'Pollution_Low': {
        whatItMeans: 'Emissions/discharges well below regulatory limits, negligible environmental impact.',
        action: 'Emissions well below legal limits.'
    },
    'Pollution_Moderate': {
        whatItMeans: 'Some pollution present but localized and largely manageable with existing controls.',
        action: 'Localized emissions/discharges, manageable.'
    },
    'Pollution_Significant': {
        whatItMeans: 'Pollution contributes to ecosystem or human health problems, near or at compliance limits.',
        action: 'Emissions causing ecosystem/health concerns.'
    },
    'Pollution_High': {
        whatItMeans: 'Severe, widespread pollution (air, water, soil), exceeding legal limits, creating major health/ecosystem risks.',
        action: 'Severe pollution, non-compliance, reputational risk.'
    },

    // BIODIVERSITY
    'Biodiversity_Low': {
        whatItMeans: 'Activities have no measurable impact; possibly neutral or even positive contribution (e.g., habitat preservation).',
        action: 'No habitat disruption, neutral/positive impact.'
    },
    'Biodiversity_Moderate': {
        whatItMeans: 'Limited disruption to local habitats/species, but impacts are reversible.',
        action: 'Small disruption in local biodiversity.'
    },
    'Biodiversity_Significant': {
        whatItMeans: 'Noticeable habitat loss or species decline directly linked to activities.',
        action: 'Significant habitat destruction or species impact.'
    },
    'Biodiversity_High': {
        whatItMeans: 'Irreversible biodiversity loss, destruction of critical habitats, or endangered species impact.',
        action: 'Irreversible biodiversity loss, ecosystem collapse.'
    },

    // CIRCULAR ECONOMY
    'Circular Economy_Low': {
        whatItMeans: 'High efficiency in resource use; waste is minimized, recycling well-integrated.',
        action: 'Efficient resource use, low waste.'
    },
    'Circular Economy_Moderate': {
        whatItMeans: 'Some inefficiencies in material use and waste, but partially mitigated.',
        action: 'Moderate waste/resource inefficiency.'
    },
    'Circular Economy_Significant': {
        whatItMeans: 'Heavy reliance on linear "take-make-dispose" model; high waste and limited reuse/recycling.',
        action: 'Large-scale waste, linear "take-make-dispose" model.'
    },
    'Circular Economy_High': {
        whatItMeans: 'Very resource-intensive and waste-heavy processes; unsustainable material use with no recycling.',
        action: 'Unsustainable, highly wasteful practices.'
    },

    // CLIMATE CHANGE
    'Climate Change_Low': {
        whatItMeans: 'Very small carbon footprint, aligned with net-zero pathways.',
        action: 'Very low GHG footprint, aligned with low-carbon goals.'
    },
    'Climate Change_Moderate': {
        whatItMeans: 'Noticeable but manageable GHG emissions, some efficiency measures in place.',
        action: 'Noticeable but manageable GHG emissions.'
    },
    'Climate Change_Significant': {
        whatItMeans: 'Large carbon footprint, not aligned with climate targets, dependency on fossil fuels.',
        action: 'High emissions, not aligned with net-zero goals.'
    },
    'Climate Change_High': {
        whatItMeans: 'Extremely high emissions, unsustainable business model, strong exposure to climate policy and transition risks.',
        action: 'Extremely high emissions, heavy fossil dependency.'
    }
}

// ============================================================
// STAGE I - SOCIAL RECOMMENDATIONS
// ============================================================

export const SOCIAL_RECOMMENDATIONS: Record<string, { whatItMeans: string; action: string }> = {
    // OWN WORKFORCE (S1)
    'Own Workforce (S1)_Low': {
        whatItMeans: 'Strong labor standards, safe workplaces, fair pay, no rights violations.',
        action: 'Maintain best practices, invest in training & wellbeing.'
    },
    'Own Workforce (S1)_Moderate': {
        whatItMeans: 'Minor gaps (e.g., limited training, occasional complaints).',
        action: 'Enhance worker engagement, improve feedback mechanisms.'
    },
    'Own Workforce (S1)_Significant': {
        whatItMeans: 'Noticeable rights issues (unsafe conditions, excessive overtime).',
        action: 'Immediate corrective action, invest in safety & HR oversight.'
    },
    'Own Workforce (S1)_High': {
        whatItMeans: 'Systemic violations (forced labor, wage theft).',
        action: 'Urgent compliance overhaul, external audits, leadership changes.'
    },

    // SUPPLY CHAIN (S2)
    'Supply Chain (S2)_Low': {
        whatItMeans: 'Suppliers comply with labor standards, transparent practices.',
        action: 'Maintain supplier audits, strengthen ESG partnerships.'
    },
    'Supply Chain (S2)_Moderate': {
        whatItMeans: 'Some suppliers in higher-risk regions, but monitored.',
        action: 'Tighten codes of conduct, diversify sourcing.'
    },
    'Supply Chain (S2)_Significant': {
        whatItMeans: 'Known labor violations (child labor, unsafe factories).',
        action: 'Suspend/exit suppliers, support supplier improvements.'
    },
    'Supply Chain (S2)_High': {
        whatItMeans: 'Widespread systemic abuses in core supply chain.',
        action: 'Restructure supply chain, third-party ESG audits.'
    },

    // COMMUNITIES (S3)
    'Communities (S3)_Low': {
        whatItMeans: 'Company benefits communities (jobs, infrastructure, CSR).',
        action: 'Maintain trust, expand CSR/community partnerships.'
    },
    'Communities (S3)_Moderate': {
        whatItMeans: 'Some localized impacts (noise, land disputes).',
        action: 'Improve community dialogue, mitigation measures.'
    },
    'Communities (S3)_Significant': {
        whatItMeans: 'Clear harm (displacement, pollution).',
        action: 'Launch grievance mechanisms, compensate, redesign ops.'
    },
    'Communities (S3)_High': {
        whatItMeans: 'Severe opposition, lawsuits, unrest.',
        action: 'Immediate remediation, mediation, possibly halt ops.'
    },

    // CONSUMERS (S4)
    'Consumers (S4)_Low': {
        whatItMeans: 'Safe products/services, transparent, strong data protection.',
        action: 'Maintain standards, seek certifications.'
    },
    'Consumers (S4)_Moderate': {
        whatItMeans: 'Minor concerns (unclear labeling, defects).',
        action: 'Strengthen QA, improve transparency.'
    },
    'Consumers (S4)_Significant': {
        whatItMeans: 'Linked to health/safety risks, misleading claims.',
        action: 'Redesign products, compliance checks.'
    },
    'Consumers (S4)_High': {
        whatItMeans: 'Widespread harm, recalls, lawsuits.',
        action: 'Halt harmful products, compensate, strict oversight.'
    },

    // CORPORATE ETHICS (G1)
    'Corporate Ethics (G1)_Low': {
        whatItMeans: 'Strong ethics, anti-corruption, transparent governance.',
        action: 'Maintain culture, training, whistleblower policies.'
    },
    'Corporate Ethics (G1)_Moderate': {
        whatItMeans: 'Some risks (weak controls, minor breaches).',
        action: 'Strengthen compliance, ethics audits.'
    },
    'Corporate Ethics (G1)_Significant': {
        whatItMeans: 'Repeated ethical issues (fraud, corruption risks).',
        action: 'Governance overhaul, board oversight.'
    },
    'Corporate Ethics (G1)_High': {
        whatItMeans: 'Systemic corruption, fraud, bribery.',
        action: 'Radical reform, independent monitoring, leadership change.'
    }
}

// ============================================================
// STAGE II - RISK RECOMMENDATIONS
// Key format: "Category_Dimension_Level"
// ============================================================

export const RISK_RECOMMENDATIONS: Record<string, string> = {
    // CLIMATE RISK
    'Climate (E1, E2)_Probability_Very likely': 'Regulatory change already decided or in force — e.g. CO₂ pricing law passed, startup must adapt its cost structure.',
    'Climate (E1, E2)_Probability_Likely': 'Strong signals or ongoing discussions — e.g. draft regulations under consultation, investor or client pressure rising.',
    'Climate (E1, E2)_Probability_Could occur': 'Topic visible but uncertain — e.g. climate policy under debate, early-stage market signals.',
    'Climate (E1, E2)_Probability_Rare': 'Unlikely or peripheral — e.g. low-emission industry, minimal exposure to regulation.',
    'Climate (E1, E2)_Impact_High': 'Entire business model or core product at risk — e.g. regulatory ban, withdrawal of market license.',
    'Climate (E1, E2)_Impact_Significant': 'Major part of operations affected — e.g. CO₂ costs reduce competitiveness or access to key markets.',
    'Climate (E1, E2)_Impact_Moderate': 'Noticeable but manageable — e.g. moderate compliance costs, logistics or reporting adjustments.',
    'Climate (E1, E2)_Impact_Low': 'Minor adjustment — e.g. small ESG reporting burden, limited reputational risk.',
    'Climate (E1, E2)_recommendation': 'Climate-related risks link mainly to SDG 13 Climate Action, SDG 7 Affordable and Clean Energy and SDG 12 Responsible Consumption and Production, especially where regulations, CO₂ pricing or energy dependency apply. How to act: Map your CO₂ exposure and regulatory risk. Explore renewable energy options and low-carbon materials. Engage investors on climate transition readiness.',

    // WATER/BIODIVERSITY RISK
    'Water/Biodiversity (E3, E4)_Probability_Very likely': 'Operations located in high water-stress regions — e.g. production, food, or hardware assembly.',
    'Water/Biodiversity (E3, E4)_Probability_Likely': 'Some exposure — suppliers or partners in semi-arid regions, potential restrictions.',
    'Water/Biodiversity (E3, E4)_Probability_Could occur': 'Indirect exposure — minor logistics or supplier dependency.',
    'Water/Biodiversity (E3, E4)_Probability_Rare': 'Minimal or no water dependency — digital or consulting business.',
    'Water/Biodiversity (E3, E4)_Impact_High': 'Major disruption — production halted, delivery stopped, brand damage.',
    'Water/Biodiversity (E3, E4)_Impact_Significant': 'Significant delay or added cost from water restrictions.',
    'Water/Biodiversity (E3, E4)_Impact_Moderate': 'Manageable adaptation — scheduling, moderate cost increase.',
    'Water/Biodiversity (E3, E4)_Impact_Low': 'Minimal impact — service-based or digital model.',
    'Water/Biodiversity (E3, E4)_recommendation': 'Water-related risks connect to SDG 6 Clean Water and Sanitation and SDG 12 Responsible Consumption and Production. How to act: Assess your water footprint across operations and suppliers. Implement water efficiency measures. Monitor biodiversity regulations in your operating regions.',

    // CIRCULAR ECONOMY RISK
    'Circular Economy (E5)_Probability_Very likely': 'Critical dependency on scarce materials or recycled inputs; cost spikes likely.',
    'Circular Economy (E5)_Probability_Likely': 'Some exposure — volatile supply or limited recycling options.',
    'Circular Economy (E5)_Probability_Could occur': 'Possible risk — niche materials, limited supplier diversification.',
    'Circular Economy (E5)_Probability_Rare': 'Low — service or digital model.',
    'Circular Economy (E5)_Impact_High': 'Business interruption or prototype delay due to missing inputs.',
    'Circular Economy (E5)_Impact_Significant': 'Cost increases or production slowdown.',
    'Circular Economy (E5)_Impact_Moderate': 'Moderate impact — workaround or substitution possible.',
    'Circular Economy (E5)_Impact_Low': 'Low — minimal physical resource use.',
    'Circular Economy (E5)_recommendation': 'Circularity risks connect to SDG 12 Responsible Consumption and Production and SDG 9 Industry, Innovation and Infrastructure. How to act: Map material dependencies and diversify suppliers. Design for recyclability and reuse. Explore circular business models to reduce resource exposure.',

    // COMMUNITIES RISK
    'Communities (S3)_Probability_Very likely': 'Community opposition already exists or is imminent — e.g. protests, petitions, strong media attention.',
    'Communities (S3)_Probability_Likely': 'Clear signals of discontent — e.g. local activism, NGO pressure, repeated community complaints.',
    'Communities (S3)_Probability_Could occur': 'Some visible concerns — e.g. minor complaints, awareness of potential issues, early-stage unease.',
    'Communities (S3)_Probability_Rare': 'Community acceptance is high — e.g. positive local relationships, community benefits visible.',
    'Communities (S3)_Impact_High': 'Business model threatened — e.g. operations blocked, permits revoked, boycotts, or legal action.',
    'Communities (S3)_Impact_Significant': 'Major disruption — e.g. delays, increased costs, reputational damage, investor concern.',
    'Communities (S3)_Impact_Moderate': 'Noticeable but manageable — e.g. need for community dialogue, additional consultation, minor delays.',
    'Communities (S3)_Impact_Low': 'Minor adjustment — e.g. small cost or communication change.',
    'Communities (S3)_recommendation': 'Community-related risks link to SDG 11 Sustainable Cities and Communities and SDG 3 Good Health and Well-being. How to act: Establish community dialogue early. Create a grievance mechanism. Document and communicate social benefits of your activities.',

    // CONSUMERS & GOVERNANCE RISK
    'Consumers & Governance (S4, G1)_Probability_Very likely': 'Non-compliant claims/T&Cs or weak privacy controls are present now or in active markets; enforcement or complaints are expected soon.',
    'Consumers & Governance (S4, G1)_Probability_Likely': 'Known gaps vs. rules/standards; monitoring flags issues in some channels; complaints are plausible within the year.',
    'Consumers & Governance (S4, G1)_Probability_Could occur': 'Policies mostly align, but grey areas or new features could drift into non-compliance; sporadic issues possible.',
    'Consumers & Governance (S4, G1)_Probability_Rare': 'Policies, claims, and privacy controls are current and audited; only edge-case violations are conceivable.',
    'Consumers & Governance (S4, G1)_Impact_High': 'Rapid investigations, fines, takedowns, or class complaints with immediate revenue and brand damage.',
    'Consumers & Governance (S4, G1)_Impact_Significant': 'Regulator inquiries, major partner escalations, or public complaints causing sales delays and costly fixes.',
    'Consumers & Governance (S4, G1)_Impact_Moderate': 'Formal warnings or negative reviews creating rework and some churn but limited market loss.',
    'Consumers & Governance (S4, G1)_Impact_Low': 'Minor, contained incidents with negligible customer or regulatory consequences.',
    'Consumers & Governance (S4, G1)_recommendation': 'Consumer and governance risks relate to SDG 16 Peace, Justice and Strong Institutions and SDG 12 Responsible Consumption and Production. How to act: Review all product claims for accuracy. Audit your data/privacy practices. Simplify T&Cs for transparency.'
}

// ============================================================
// STAGE II - OPPORTUNITY RECOMMENDATIONS
// ============================================================

export const OPPORTUNITY_RECOMMENDATIONS: Record<string, string> = {
    // CLIMATE OPPORTUNITY
    'Climate (E1, E2)_Likelihood_Very likely': 'Strong demand and incentives already present — e.g. customers and investors actively seek CO₂-neutral products, subsidies available.',
    'Climate (E1, E2)_Likelihood_Likely': 'Market and investors show rising interest — e.g. sustainability becoming a key differentiator in funding or tenders.',
    'Climate (E1, E2)_Likelihood_Could occur': 'Opportunity visible but uncertain — e.g. niche markets, dependent on competitors or policy timing.',
    'Climate (E1, E2)_Likelihood_Rare': 'Low chance — e.g. current market driven mainly by price, not sustainability.',
    'Climate (E1, E2)_Impact_High': 'Game changer — e.g. green product defines category, attracts major investors and customers.',
    'Climate (E1, E2)_Impact_Significant': 'Strong gain — e.g. preferred supplier in tenders, improved access to funding and partnerships.',
    'Climate (E1, E2)_Impact_Moderate': 'Noticeable improvement — e.g. new customer segment, process efficiency gains.',
    'Climate (E1, E2)_Impact_Low': 'Small benefit — e.g. minor brand image boost, incremental sales.',
    'Climate (E1, E2)_recommendation': 'Climate opportunities align with SDG 13 Climate Action, SDG 7 Affordable and Clean Energy and SDG 9 Industry, Innovation and Infrastructure. How to act: Highlight your low-carbon credentials in marketing. Apply for green innovation grants. Position your product/service in climate-neutral market segments.',

    // WATER/BIODIVERSITY OPPORTUNITY
    'Water/Biodiversity (E3, E4)_Likelihood_Very likely': 'Clear investor and customer demand for low-water operations.',
    'Water/Biodiversity (E3, E4)_Likelihood_Likely': 'Water efficiency valued by partners, improves ESG score.',
    'Water/Biodiversity (E3, E4)_Likelihood_Could occur': 'Internal gains, some marketing potential.',
    'Water/Biodiversity (E3, E4)_Likelihood_Rare': 'Low visibility or no water connection.',
    'Water/Biodiversity (E3, E4)_Impact_High': 'Major differentiator — water-efficient brand recognized in awards or tenders.',
    'Water/Biodiversity (E3, E4)_Impact_Significant': 'Noticeable reputation and trust benefits.',
    'Water/Biodiversity (E3, E4)_Impact_Moderate': 'Moderate benefit — niche marketing advantage.',
    'Water/Biodiversity (E3, E4)_Impact_Low': 'Minor, internal-only improvement.',
    'Water/Biodiversity (E3, E4)_recommendation': 'Water-related opportunities support SDG 6 Clean Water and Sanitation and SDG 12 Responsible Consumption and Production. How to act: Quantify and communicate your water efficiency. Partner with water stewardship initiatives. Use biodiversity action as a brand differentiator.',

    // CIRCULAR ECONOMY OPPORTUNITY
    'Circular Economy (E5)_Likelihood_Very likely': 'Strong market or investor demand for circular models — e.g. tenders, grants, accelerators.',
    'Circular Economy (E5)_Likelihood_Likely': 'Increasing recognition by clients for recycled or reuse-based design.',
    'Circular Economy (E5)_Likelihood_Could occur': 'Some internal benefit, limited visibility.',
    'Circular Economy (E5)_Likelihood_Rare': 'Low demand in target segment.',
    'Circular Economy (E5)_Impact_High': 'Core differentiator — circular startup seen as industry innovator.',
    'Circular Economy (E5)_Impact_Significant': 'Noticeable advantage — investor trust, customer preference, lower cost base.',
    'Circular Economy (E5)_Impact_Moderate': 'Moderate — process efficiency and waste reduction.',
    'Circular Economy (E5)_Impact_Low': 'Minor — internal benefit only.',
    'Circular Economy (E5)_recommendation': 'Circularity opportunities align with SDG 12 Responsible Consumption and Production, SDG 9 Industry, Innovation and Infrastructure and SDG 13 Climate Action. How to act: Design products for disassembly and reuse. Explore take-back schemes. Apply to circular economy accelerators and funding programs.',

    // COMMUNITIES OPPORTUNITY
    'Communities (S3)_Likelihood_Very likely': 'Strong community interest in partnership — e.g. joint local projects, public support, government incentives.',
    'Communities (S3)_Likelihood_Likely': 'Clear mutual benefit opportunities — e.g. shared value initiatives, local hiring, or training partnerships.',
    'Communities (S3)_Likelihood_Could occur': 'Potential exists but uncertain — e.g. community interest identified, requires more resources.',
    'Communities (S3)_Likelihood_Rare': 'Limited opportunity — e.g. minimal overlap with community needs.',
    'Communities (S3)_Impact_High': 'Transformative opportunity — e.g. recognized as local impact leader, improved market access, social awards.',
    'Communities (S3)_Impact_Significant': 'Strong advantage — e.g. preferred vendor status, easier permitting, positive brand image.',
    'Communities (S3)_Impact_Moderate': 'Noticeable benefit — e.g. better local support, improved workforce availability.',
    'Communities (S3)_Impact_Low': 'Minor advantage — e.g. small goodwill or media benefit.',
    'Communities (S3)_recommendation': 'Community-based opportunities support SDG 11 Sustainable Cities and Communities and SDG 10 Reduced Inequalities. How to act: Develop a community engagement strategy. Invest in local hiring and training. Document and publish your community impact.',

    // CONSUMERS & GOVERNANCE OPPORTUNITY
    'Consumers & Governance (S4, G1)_Likelihood_Very likely': 'Governance upgrades (truthful claims, privacy-by-design, clear T&Cs) will be adopted and recognized by customers/partners.',
    'Consumers & Governance (S4, G1)_Likelihood_Likely': 'Planned improvements are feasible with existing teams; customer and partner uptake expected.',
    'Consumers & Governance (S4, G1)_Likelihood_Could occur': 'Benefits depend on external alignment (partners, timing, approvals); upside is plausible.',
    'Consumers & Governance (S4, G1)_Likelihood_Rare': 'Limited capacity or low stakeholder interest makes near-term uptake unlikely.',
    'Consumers & Governance (S4, G1)_Impact_High': 'Material trust and conversion lift; preferred-supplier status, access to regulated markets, and premium pricing potential.',
    'Consumers & Governance (S4, G1)_Impact_Significant': 'Noticeable CAC/LTV improvement, reduced sales friction, and stronger partner compliance wins.',
    'Consumers & Governance (S4, G1)_Impact_Moderate': 'Incremental trust gains, smoother reviews, and modest efficiency in sales/legal workflows.',
    'Consumers & Governance (S4, G1)_Impact_Low': 'Small credibility boost; mainly hygiene/compliance with limited commercial effect.',
    'Consumers & Governance (S4, G1)_recommendation': 'Governance and consumer-trust opportunities align with SDG 16 Peace, Justice and Strong Institutions and SDG 12 Responsible Consumption and Production. How to act: Invest in privacy-by-design. Make product claims verifiable. Use governance strength as a competitive differentiator in B2B sales.'
}