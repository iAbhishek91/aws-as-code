import { EC2 } from 'aws-sdk';
import { PRIMARY_KEY_PAIR_NAME, REGION } from '../constants';
import describeKeyPair from './describeKeyPair';


const ec2 = new EC2({ region: REGION });


// API parameters
const createKeyPairParams = {
  KeyName: PRIMARY_KEY_PAIR_NAME,
  DryRun: false, // in case true: DryRunOperation err if you are allowed, else unauthorized
};


const createKeyPair = async () => {
  const { KeyName } = createKeyPairParams;
  // describeKeyPairs using to validate key-pair already exists.
  // we can skip using this function as createKeyPairs throws error before creating key pairs.
  // we are using it here to make use of as many API as possible.
  const describeAllKeyPairs = await describeKeyPair();

  const isKeyPairExists = describeAllKeyPairs.KeyPairs.find(
    (keyPair) => keyPair.KeyName === KeyName,
  );

  if (isKeyPairExists) {
    console.log(`"${KeyName}" already exists. Skipping...`);
  } else {
    console.log(`"${KeyName}" do not exist! Creating one...`);

    const newKeyPairDetails = await ec2.createKeyPair(createKeyPairParams).promise();
    console.log(newKeyPairDetails);
    // OUTPUT below:
    /* eslint-disable max-len */
    /* { KeyFingerprint: 'b2:34:30:f8:c6:47:14:49:26:dd:52:ee:82:eb:fb:7b:34:fa:69:61',
    KeyMaterial: '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAuXguPiD5sUdyAeyRjaklKJhdJ0G2CvdnYQ8yoKqFe7twpqQWpFwZ5Wog8EUt64\nLMw83I+Fhq882l5JpIqTYtDlyfXXrAo0aTVzXSdabSRxZaKrHF5VzW0GpEkO7FIEc/pfE+CYXuem\naisywfpjE3NvYJo4Znowi/Evt4NA2KrNEvXdYoxjldbo0UfQEUrxnjPqzSVixf5OVjwxL5xNS4BT\nv31Hhbosu9029h56+DzcNIV/EywX+vvIolw1NWBSwvlpTiCDDdI3yuSd7emBr3RM1Z0+sNn2cgTO\n0y9KDlypftgQDRlym063sr5tmjTOJ58TxSIl4XBbgedOK2vwvfobzwIDAQABAoIBAHjxVbZN6oUg\nAcgfa8DZVavsMaposgKdmw/2Klz8WPxTXlap5jML/ZJQGJGxiogr5sQtEvVw8E21jnAtrU6SykWY\nertFLEgvAruMHftt+EQ+fzZQjcMXhW079u9DzIOUkMt1eebpSCuTX9X+YP0eGVL1PjIVG/Mlo+gX\nPwIK3w+tBvPC7N5MU7vt674nZxWjcsOHOjAzrSr4MY0uOtnz78Pi+qlVwd2apPPtoU2V+UvVU2k1\neMdISPm76RLXzykYAShsLvPRw83Y+gg885mB0WnK5twehJXDalSNtUHOYbtsOi6X6E0b9EyYTvmz\ngz1U+Jk8X3JmOE2oIOa7Z4mMPoECgYEA7zqswNfAE+IUjFHC26eeHj3de+goFQNnNTOlYzPj8l9V\nfQExSQHBu2YCaou02SupdRahs49T8Ys0dnNDYWc4LrQ6JYerYiLMiethaAUaQA2g/Y54KFU/uZDk\n+PaJiCFZt7eJhWjnnJak3cAzkO7oBZ5EtK+XM88o2QVGSNDkZj0CgYEAxni0+zMPV//2jJ0CQX6G\naeTn4SrQAoI+JXPd8mG0qqZMB2ag+ae55dzditiBEeEwMd3RNZJ3V2nvd77A0xD0D5CF5t5rgl7K\n4FeyAlYrBVTmA8B+K7oAmg0k+X6MR71yI6aiSY+Jsn4SsAsP6/DIXhi/Ae1JIgUq3bjPmSLtNvsC\ngYEAsZy9f9tvBxQWL2vQoSZcVZWW6BSgFaHWMYCrrPBsr5kqLkoBXnPIcyq0Zohc99Pb10u7OEYU\ni8PPapX/E8T/yGUUuqJ0ksLFWyx/wCvxpla4DSiGe2N3kX1LErBvwbsJEkZY+sy9ENwjgWPepR9K\n8kjkN8YaG2QVrrKk0REOUf0CgYBxQjrNSuMLrdbtgT/jTie4UFd+6CaR9+8tAkT654TpCUNDye48\n6dks8nA+prRpFp+hJVsY/j86VArCw8lX6UnNhATVrcGeQSf3BDRiHvgn773fED8wBtIHF08tTWkS\nG2sCKzpbTh0fDdDuQzHPy7Ub9XUyzU05q8c9hhR56DOEdwKBgBJwNB/aDwmy/Xn+/VkUezJ3Fcmx\nbS7oNz+9niKyJZdqgUZx5cwSj96YN2BtIn7SGo55Tx9NKyh3zN7nJ3eXOCHwpLAawPMHiNwzl6og\nWIk0xClukov21D+kF/o0ZfMLOTvvXzvBeUYUdnTzI6uZ7lSdWBeE38VDgFYsypcW25Vl\n-----END RSA PRIVATE KEY-----',
    KeyName: 'my-key-pair',
    KeyPairId: 'key-09fa3aeb5ad840d62' } */
    /* eslint-enable max-len */
  }
};

createKeyPair();
