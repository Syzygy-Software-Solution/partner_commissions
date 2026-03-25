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
});
