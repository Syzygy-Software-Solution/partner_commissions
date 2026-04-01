using { sz as db } from '../db/partner_commissions_schema';

service PartnerCommissionsService {
    entity PayeeMapping as projection on db.PayeeMapping;
    entity IncentiveTypes as projection on db.IncentiveTypes;
    entity EligibleTiers as projection on db.EligibleTiers;
    entity FieldCustomizations as projection on db.FieldCustomizations;
    entity PartnerTypes as projection on db.PartnerTypes;

    type IncentiveTypeEntry {
        incentiveType : String;
        active        : Boolean;
    }
    action saveIncentiveTypes(items : array of IncentiveTypeEntry) returns String;

    type EligibleTierEntry {
        partnerTier      : String;
        revenueBand      : String;
        region           : String;
        tier             : String;
        eligibilityFlag  : String;
    }
    action saveEligibleTiers(items : array of EligibleTierEntry) returns String;

    type FieldCustomizationEntry {
        position     : Integer;
        fieldId      : String;
        columnName   : String;
        defaultLabel : String;
        customLabel  : String;
        enabled      : Boolean;
        fixed        : Boolean;
    }
    action saveFieldCustomizations(items : array of FieldCustomizationEntry) returns String;

    type PartnerTypeEntry {
        partnerType : String;
        active      : Boolean;
    }
    action savePartnerTypes(items : array of PartnerTypeEntry) returns String;
}
