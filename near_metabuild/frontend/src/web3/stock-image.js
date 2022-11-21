/* Talking with a contract often involves transforming data, we recommend you to encapsulate that logic into a class */

export class StockImage {
  constructor({ contractId, walletToUse }) {
    this.contractId = contractId;
    this.wallet = walletToUse;
  }

  async get_all_images() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_all_images' });
  }

  async get_base_ipfs_url() {
    return await this.wallet.viewMethod({ contractId: this.contractId, method: 'get_base_ipfs_url' });
  }

  async add_owner_images(image, owner_acc) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'add_owner_images', args: { image, owner_acc } });
  }

  async get_royalty_amount(owner_acc, image_title) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'get_royalty_amount', args: { owner_acc, image_title } });
  }

  async pay_royalty(amount, owner_acc, image_title, sender_acc) {
    return await this.wallet.callMethod({
        contractId: this.contractId,
        method: 'pay_royalty',
        args: { amount, owner_acc, image_title, sender_acc } });
  }

  async get_royalty_amount(image_title, account) {
    return await this.wallet.callMethod({ contractId: this.contractId, method: 'get_royalty_amount', args: { image_title, account } });
  }
}


//  Abstract the logic of interacting with the contract to simplify your flow
const GetStockImageContract = (wallet) => {
  const contract = new StockImage({
    contractId: process.env.CONTRACT_NAME,
    walletToUse: wallet
  });
  return contract;
};

export default GetStockImageContract;