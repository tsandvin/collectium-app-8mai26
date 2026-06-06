import { CollectiumSidebar } from "./CollectiumSidebar";
import { CollectiumTopbar } from "./CollectiumTopbar";

export function CollectiumAppShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <div className="ct-shell">
      <CollectiumTopbar />
      <div className="ct-body">
        <CollectiumSidebar />
        <main className="ct-main">{children}</main>
      </div>
    </div>
  );
}
