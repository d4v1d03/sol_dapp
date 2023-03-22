import { 
    clusterApiUrl, 
    Connection, 
    PublicKey, 
    Keypair, 
    LAMPORTS_PER_SOL 
} from '@solana/web3.js';

import { 
    createMint, 
    getOrCreateAssociatedTokenAccount, 
    mintTo, 
    transfer, 
    Account, 
    getMint, 
    getAccount
} from '@solana/spl-token';

window.Buffer = window.Buffer || require("buffer").Buffer;

function MintToken(){
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromWallet = Keypair.generate();
    const toWallet = new PublicKey("7c2TNg59e4BNSrAQto3ex4GevgKxfxJDzJXWmpHdttcu");
    let fromTokenAccount: Account; 
	let mint: PublicKey;

    async function createToken(){
        const fromAirdropSignature = await connection.requestAirdrop(fromWallet.publicKey, LAMPORTS_PER_SOL);
        await connection.confirmTransaction(fromAirdropSignature);

        mint = await createMint(connection, fromWallet, fromWallet.publicKey, null, 9);
        console.log(`Create token: ${mint.toBase58()}`);

        fromTokenAccount = await getOrCreateAssociatedTokenAccount(connection, fromWallet, mint,fromWallet.publicKey);
        console.log(`Create token account: ${fromTokenAccount.address.toBase58()}`);
    }

    async function mintToken(){
        const signature = await mintTo(connection, fromWallet, mint, fromTokenAccount.address, fromWallet.publicKey,1000000000);
        console.log(`Mint signature: ${signature}`); 
    }

    return(
    <div>
        Mint Token Section
        <div>
            <button onClick={createToken}>Create Token</button>
            <button>Mint Token</button>
            <button>Check Balance</button>
            <button>Send Token</button>
        </div>
    </div>
    );
}
export default MintToken;