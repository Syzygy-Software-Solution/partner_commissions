namespace sz;
using { cuid, managed } from '@sap/cds/common';

entity IncentiveTypes: cuid, managed {
    incentiveType : String;
    active        : Boolean;
}

entity PayeeMapping: cuid, managed{
    participantSeq: String;	
    participantId : String;	
    tcmpPayeeId : String;	
    effectiveStartDate : Date;	
    effectiveEndDate : Date;	
    createDate: Date;	
    removeDate: Date;	
    partnerType : String;	
    partnerName: String;	
    genericAttribute1 : String;	
    genericAttribute2 : String;	
    genericAttribute3 : String;
    genericAttribute4 : String;
    genericAttribute5 : String;
    genericAttribute6 : String;
    genericAttribute7 : String;
    genericAttribute8 : String;
    genericAttribute9 : String;
    genericAttribute10 : String;
    genericAttribute11 : String;
    genericAttribute12 : String;
    genericAttribute13 : String;
    genericAttribute14 : String;
    genericAttribute15 : String;
    genericAttribute16 : String;
    genericNumber1 : Decimal;
    genericNumber2 : Decimal;
    genericNumber3 : Decimal;
    genericNumber4 : Decimal;
    genericNumber5 : Decimal;
    genericNumber6 : Decimal;
    genericDate1 : Date;
    genericDate2 : Date;
    genericDate3 : Date;
    genericDate4 : Date;
    genericDate5 : Date;
    genericDate6 : Date;
    genericBoolean1 : Boolean;
    genericBoolean2 : Boolean;
    genericBoolean3 : Boolean;
    genericBoolean4 : Boolean;
    genericBoolean5 : Boolean;
    genericBoolean6 : Boolean;
}