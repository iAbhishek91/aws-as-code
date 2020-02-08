import { EC2 } from 'aws-sdk';
import { REGION, API_VERSIONS, EC2_INSTANCE_ATTRIBUTES } from '../../constants';


const ec2 = new EC2({ region: REGION, apiVersion: API_VERSIONS });


// API params
const describeImagesParams = {
  DryRun: false,
  /* Owners: ['aws'], // 099720109477
  Filters: [
    { Name: 'is-public', Values: ['true'] },
    { Name: 'image-type', Values: ['machine'] },
    { Name: 'virtualization-type', Values: ['hvm'] },
    { Name: 'state', Values: ['available'] },
    { Name: 'root-device-type', Values: ['ebs'] },
    { Name: 'root-device-name', Values: ['/dev/sda1'] },
    // remove the below param, to get list many AMI.
    { Name: 'name', Values: ['ubuntu/images/hvm-ssd/ubuntu-bionic-18.04-amd64-server-20191002'] },
  ], */
  ImageIds: [EC2_INSTANCE_ATTRIBUTES.ImageId],
};


// this function work for all image types: AMI, AKI, ARI
const describeImages = async () => {
  const availableImageForMe = await ec2.describeImages(describeImagesParams).promise();

  console.log(availableImageForMe);


  // comment: to determine unique values of any attributes. Below we took example fo architecture

  // const uniqueArchitecture = new Set(
  //   availableImageForMe.Images.map((image) => image.Architecture),
  // );
  // console.log(`VM: Architecture available ${uniqueArchitecture}`);


  // comment: filter using string contains. the below feature is not available in AWS SDK.

  // const imageArr = availableImageForMe.Images.filter(
  //   (image) => image.Name.toLowerCase().includes('ubuntu'),
  // );

  // imageArr.map((image) => (
  //   console.log(`image: ${image.ImageId} | name: ${image.Name}`)
  // ));
};

describeImages();
