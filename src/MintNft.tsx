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

function MintNft(){
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromWallet = Keypair.generate();
    let fromTokenAccount: Account; 
	let mint: PublicKey;

    async function createNft(){
        const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirdropSignature);

        mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 0);
        console.log(`Create token: ${mint.toBase58()}`);

        fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint,fromWallet.publicKey);
        console.log(`Create token account: ${fromTokenAccount.address.toBase58()}`);
    }

    async function mintNft(){
        const signature = await mintTo(connection, fromWallet, mint, fromTokenAccount.address, fromWallet.publicKey,1);
        console.log(`Mint signature: ${signature}`); 
    }

    async function lockNft(){
        let transaction = new Transaction().add(createSetAuthorityInstruction(
            mint,
            fromWallet.publicKey,
            AuthorityType.MintTokens,
            null
        ));

        const signature = await sendAndConfirmTransaction(connection, transaction, [fromWallet]);
        console.log(`Lock signature: ${signature}`);
    }

    return(
    <div>
        Mint NFT Section
        <div>
            <button onClick={createNft}>Create NFT</button>
            <button onClick={mintNft}>Mint NFT</button>
            <button onClick={lockNft}>Lock NFT</button>
        </div>
    </div>
    );
}
export default MintNft;