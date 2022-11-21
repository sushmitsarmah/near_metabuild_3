import { NearBindgen, NearPromise, near, call, view } from 'near-sdk-js';
import { AccountId } from 'near-sdk-js/lib/types'

interface ImageObj {
  ipfs_url: string;
  title: string;
  width: number;
  height: number;
  description: string;
  royalty: bigint;
};

interface StockImageObj {
  ownerAcc: AccountId;
  images: ImageObj[];
}

interface Royalty {
  account: AccountId;
  owner_account: AccountId;
  image: ImageObj;
  royalty_paid: bigint;
}

@NearBindgen({})
class StockImage {
  ipfsBaseUrl: string = "";
  ownerAccs: StockImageObj[] = [];
  royalties: Royalty[] = [];

  @view({}) // This method is read-only and can be called for free
  get_base_ipfs_url(): string {
    return this.ipfsBaseUrl;
  }

  @view({}) // This method is read-only and can be called for free
  get_all_images(): StockImageObj[] {
    return this.ownerAccs;
  }

  @call({}) // This method changes the state, for which it cost gas
  add_owner_images({ image, owner_acc }: { image: ImageObj, owner_acc: AccountId }): void {
    // Record a log permanently to the blockchain!
    near.log(`Saving image ${image.title} for account ${owner_acc}`);
    const obj = this.ownerAccs.find((k: StockImageObj) => k.ownerAcc === owner_acc);
    if(obj) {
      obj.images.push(image);
    } else {
      this.ownerAccs.push({
        ownerAcc: owner_acc,
        images: [image]
      })
    }
  }

  @view({}) // This method changes the state, for which it cost gas
  get_royalty_amount({ owner_acc, image_title }: { amount: bigint, owner_acc: string, image_title: string }): bigint {
    const obj = this.ownerAccs.find((k: StockImageObj) => k.ownerAcc === owner_acc);
    if(obj) {
      const image = obj.images.find((k: ImageObj) => k.title === image_title);
      if(image) {
        return image.royalty;
      }
    }
    return BigInt(-1);
  }

  // Maybe issue an NFT for royalty paid. Create another contract for that
  @call({}) // This method changes the state, for which it cost gas
  pay_royalty({ amount, owner_acc, image_title, sender_acc }: { amount: bigint, owner_acc: AccountId, image_title: string, sender_acc: AccountId }): void {
    const obj = this.ownerAccs.find((k: StockImageObj) => k.ownerAcc === owner_acc);
    if(obj) {
      const image = obj.images.find((k: ImageObj) => k.title === image_title);
      if(image && image.royalty === amount) {
        NearPromise.new(owner_acc).transfer(amount);
        this.royalties.push({
          account: sender_acc,
          owner_account: owner_acc,
          image,
          royalty_paid: amount
        });
      }
    }
  }

  @view({}) // This method changes the state, for which it cost gas
  get_royalty({ image_title, account }: { image_title: string, account: AccountId }): Royalty {
    const obj = this.royalties.find((k: Royalty) => (
      k.account === account && k.image.title === image_title
    ));
    return obj;
  }
}