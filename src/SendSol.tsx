import { 
    clusterApiUrl, 
    Connection, 
    PublicKey, 
    Keypair, 
    LAMPORTS_PER_SOL, 
    sendAndConfirmTransaction,
    Transaction
} from '@solana/web3.js';

import { 
    createMint, 
    getOrCreateAssociatedTokenAccount, 
    mintTo,  
    Account, 
    createSetAuthorityInstruction,
    AuthorityType
} from '@solana/spl-token';

window.Buffer = window.Buffer || require("buffer").Buffer;

function SendSol(){
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromWallet = Keypair.generate();
    let fromTokenAccount: Account; 
	let mint: PublicKey;

    

    return(
    <div>
        Send SOL Section
        <div>
            <button /*onClick={createNft}*/>Create NFT</button>
            <button /*onClick={mintNft}*/>Mint NFT</button>
            <button /*onClick={lockNft}*/>Lock NFT</button>
        </div>
    </div>
    );
}
export default SendSol;