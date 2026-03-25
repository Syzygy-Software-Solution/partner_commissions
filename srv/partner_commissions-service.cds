using { sz as db } from '../db/partner_commissions_schema';

service PartnerCommissionsService {
    entity PayeeMapping as projection on db.PayeeMapping;
    entity IncentiveTypes as projection on db.IncentiveTypes;

    type IncentiveTypeEntry {
        incentiveType : String;
        active        : Boolean;
    }
    action saveIncentiveTypes(items : array of IncentiveTypeEntry) returns String;
}
