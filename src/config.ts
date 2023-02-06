const missingSetting = "Warning: No Value set for this enviroment variable";

const config = {
    "PORT": process.env.PORT || missingSetting,
};

export default config;