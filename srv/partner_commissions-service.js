const cds = require("@sap/cds");

module.exports = cds.service.impl(async function () {
    this.on("saveIncentiveTypes", async (req) => {
        const { items } = req.data;
        const { IncentiveTypes } = this.entities;

        await DELETE.from(IncentiveTypes);

        if (items && items.length > 0) {
            const entries = items.map((item) => ({
                incentiveType: item.incentiveType,
                active: item.active
            }));
            await INSERT.into(IncentiveTypes).entries(entries);
        }

        return "Incentive types saved successfully.";
    });

    this.on("saveEligibleTiers", async (req) => {
        const { items } = req.data;
        const { EligibleTiers } = this.entities;

        await DELETE.from(EligibleTiers);

        if (items && items.length > 0) {
            const entries = items.map((item) => ({
                partnerTier: item.partnerTier,
                revenueBand: item.revenueBand,
                region: item.region,
                tier: item.tier,
                eligibilityFlag: item.eligibilityFlag
            }));
            await INSERT.into(EligibleTiers).entries(entries);
        }

        return "Eligible tiers saved successfully.";
    });

    this.on("saveFieldCustomizations", async (req) => {
        const { items } = req.data;
        const { FieldCustomizations } = this.entities;

        await DELETE.from(FieldCustomizations);

        if (items && items.length > 0) {
            const entries = items.map((item) => ({
                position: item.position,
                fieldId: item.fieldId,
                columnName: item.columnName,
                defaultLabel: item.defaultLabel,
                customLabel: item.customLabel,
                enabled: item.enabled,
                fixed: item.fixed
            }));
            await INSERT.into(FieldCustomizations).entries(entries);
        }

        return "Field customizations saved successfully.";
    });

    this.on("savePartnerTypes", async (req) => {
        const { items } = req.data;
        const { PartnerTypes } = this.entities;

        await DELETE.from(PartnerTypes);

        if (items && items.length > 0) {
            const entries = items.map((item) => ({
                partnerType: item.partnerType,
                active: item.active
            }));
            await INSERT.into(PartnerTypes).entries(entries);
        }

        return "Partner types saved successfully.";
    });
});
