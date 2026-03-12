using { sz as db } from '../db/partner_commissions_schema';

service PartnerCommissionsService {
    entity PayeeMapping as projection on db.PayeeMapping;
}
